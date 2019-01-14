---
title: "Responsive Same-Domain Iframe in React Component"
published_at: "2019-01-06"
updated_at: "2019-01-06"
published: "true"
---

## Why you may want it

Recently, we needed to embed a number of personal finance calculators in
our customer-facing portal. Instead of building very elaborate models for the
calculators and spending a lot of time on implementing each one of them from
scratch, we wanted to see which calculators users would find most interesting.
Iteration speed and testing users' interactions with many calculators and
underlying models was more important than building a perfect calculator or
having the outputs persisted in the backend.

Based on these requirements, we decided to look for tools that would help the
buisness team create calculators easily and quickly and keep developers focused
on more pressing development tasks. We found a website that converts
spreadsheets with formulas into responsive and dynamic forms that can also display
results. Lastly, the site also allows us to download the forms as html files. And
all of it for free (_which is always good for a startup_)!

Instead of just rendering these files individually, we wanted to make them
feel like they were native to our app and surround them with the proper
context and branding. They couldn't just look like iframes clumsily thrown onto
the page. That
meant no double scrolling in this case (where you have a scrollbar on the browser
window and another one on a particular iframe or div in the DOM).
That's not so easy when the forms themselves would get longer or shorter in the
iframe based on the user toggling a switch or changing an answer. Also, different
calculators have different lengths in their iframes. Thus, no hardcoding allowed
because we wanted to reuse the pages and components wrapping those calculators.

You may use the following techniques if
1) You're using React (though similar things may work for other frontend frameworks)
2) You don't need to render server-side
3) You have an html file, a relative path to your own domain, or a url
to a domain with cross-origin checking turned off.

One last word of caution. Be careful which html files or urls you include,
otherwise you may expose your users to XSS.

Ok, so far so motivated...

## How you do it

If you want to dive right into the code and see the working example without much
further ado, then click [here](https://codepen.io/simongawlik/pen/zyJbMm).

<iframe style="width:100%;" height="300" src="https://codepen.io/simongawlik/full/zyJbMm" frameborder="1" allowfullscreen></iframe>

If you've read past this point, then I'll provide some context to the code now.

The difficulty is that React's virtual DOM needs to work with the actual
DOM. Some elements like the `iframe`'s content may load after the virtual
DOM has already mounted the components. Or a user may drag the side of the browser and that
could change the height of the `iframe`'s content. What we need is for the
component to be told what the height of the iframe's content wants to be and
when that changes. The component could then pass down that height to the
components that wrap the `iframe`.

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { iframeHeight: undefined };
  }
  ...
}
```

You can see that my `App` component has only one variable in its state,
`iframeHeight`. We use will use it to set the height of the elements that contain
the `iframe`.

```javascript
  componentDidMount() {
    this.checkIfIframeLoaded();
  }

  checkIfIframeLoaded = () => {
    const iframe = document.getElementById('responsive-iframe');
    const iframeDoc = iframe.contentDocument ||
      iframe.contentWindow.document;

    if (iframeDoc.readyState === 'complete' &&
        iframeDoc.getElementsByTagName('body').length) {
      this.onElementHeightChange(iframe, this.updateIframeHeight);
      return;
    }
    window.setTimeout(this.checkIfIframeLoaded, 100);
  }
```

As soon as the component is done mounting, we check if our particular iframe
exists in the DOM yet. We use the DOM API to see if we can find an `iframe` with
a particular `id`, in this case `'responsive-iframe'`, and whether the
document inside of it is done loading and
contains a `body` tag. If it does, we can get the height of the body and update
`iframeHeight`. If not, we wait for 0.1 seconds and try again.

When `iframeHeight` changes, we re-render the component.

{% raw %}
```jsx
  render() {
    const { iframeHeight } = this.state;
    return (
      <div className="container" >
        <div>
          Let's embed this iframe below like
          it's part of our site! No double-scrolling
        </div>
        <div
          className="iframe-container"
          style={{
            ...(iframeHeight
              ? { height: iframeHeight }
              : {}
            )
          }}
        >
          <iframe
            id="responsive-iframe"
            style={{
              ...(iframeHeight
                ? { height: iframeHeight }
                : {}
              )
            }}
            srcdoc={iframeContent}
          >
          </iframe>
        </div>
        <div>
          Let's embed this iframe above like
          it's part of our site! No double-scrolling
        </div>
      </div>
    )
  }
```
{% endraw %}

I'm conditionally applying styles depending on whether we have a height to
work with or not. Note that inline styles like this give us a small performance hit.

Okay, if you were reading closely, you noticed that I glossed over
`onElementHeightChange` and `updateIframeHeight`. What's happening in those?

```javascript
  onElementHeightChange = (el, callback) => {
    let lastHeight = el
      .contentWindow
      .document
      .getElementsByTagName('body')[0]
      .scrollHeight;
    let newHeight;
    (function run() {
      let bodies = el
        .contentWindow
        .document
        .getElementsByTagName('body')
      if (bodies.length) {
        newHeight = bodies[0].scrollHeight;
        if (lastHeight !== newHeight) {
          callback();
        }
      }

      lastHeight = newHeight;
      el.onElementHeightChangeTimer = setTimeout(run, 750);
    })();
  }
```

We compare the current height of the iframe, `lastHeight`, with its `newHeight`.
What's with the `run` function in parentheses, you ask? It's a recursive function that we
call right away ([IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)).
Basically, we call the `run` function, it gets the new height of the `iframe`
and if that height is different from the previous one, we call the callback
function, which in our case is `updateIframeHeight` and we'll discuss it right
after this one. On the last line, we do a setTimeout  which will call the `run`
function again after a certain amount of milliseconds have passed. In practice,
this means that we created a loop that checks every so many milliseconds whether
the height of the iframe has changed, and if so, tells the component via
`updateIframeHeight`.

```javascript
  updateIframeHeight = (newHeight) => {
    this.setState({ iframeHeight: newHeight });
  }
```

Nothing crazy happening here, just updating the height in the component state...
and we're done!

## Conclusion

We found a way to continuously have the body inside of an `iframe` report its
height to a React component that contains the `iframe`. This enabled us to use the
set the height of the containers around the `iframe` and make it appear as if it
was just a normal `div` that flows and resizes with the rest of the page.

If you have suggestions for better ways to include responsive `iframes`, I'd love
to hear about them. Feel free to contact me!

## Tidbits

Using the `srcdoc` attribute on an `iframe` is a fun way to render a full html
string converted to actual markup in a document. This is useful
if you're trying to display the html-version of an email or a scraped website
that you've saved to a text field in your database.

When you access the html or body inside of an iframe with the DOM API you may
notice that the `scrollHeight` of the `body` and that of the `html` element are not the same.
This happens when tags such as `body` or `p` don't have their margins reset.
That's why you can see me adding `style="margin:0;"` to most of the elements in
`iframeContent`.

Some people think that you need to `clearTimeout` after `setTimeout`. However,
that's only the case if you want to stop it before it runs.




