---
title: "Sticky Sidebar at Specific Height"
published_at: "2019-01-11"
updated_at: "2019-01-11"
published: "true"
---

## Why you may want it

Sometimes things on the screen are only supposed to move so much and then stay
where they are. I was working on a task a few months ago where we decided to
implement that behavior. We needed it for a score in the left sidebar
of our results page that follows a long
quiz. We wanted to draw users' focus to the score and keep it at the
center of attention even while users were free to explore the rest of the page.

When the user scrolls down the score scrolls with the rest of the page
until it reaches the bottom of our fixed header. It then stays there while the
main content continues to scroll as the user scrolls. It also detaches
itself from the fixed header when the user scrolls back up.

Too many words... observe:

<iframe style="width:100%;" height="300" src="https://codepen.io/simongawlik/full/VqGmKQ" frameborder="1" allowfullscreen></iframe>

## How you do it

As always, you can jump right into the working example with code
[here](https://codepen.io/simongawlik/pen/VqGmKQ) but we'll walk through it
together below.

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fixedHeight: false };
  }
  ...
  render() {
    return (
      <div>
        <div className="header">header</div>
        <div className="shim"></div>
        <div className="container">
          <div
            className="sticky-at-height"
            style={{
              ...(this.state.fixedHeight
                ? {
                    position: "fixed",
                    top: HEADER_HEIGHT,
                  }
                : {})
            }}
           >
            some menu items that get sticky when they reach the header
          </div>
          <div
            className="side-shim"
            style={{
              ...(this.state.fixedHeight
                ? { width: SIDE_MENU_WIDTH }
                : {})
            }}
          >

          </div>
          <div id="reference">
            <p className="lots-o-text">
              imagine a whole bunch of text.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
```

We're tracking whether the `div` containing the sidebar, `.sticky-at-height`
should be fixed under the header in `App`'s component state. This allows
us to conditionally apply styles to the elements that will make it look seamless.

Let's walk through the structure of the elements real quick. The header comes
first and we fix it to the top of the screen.

```css
.header {
  height: 40px;
  width: 100%;
  background-color: red;
  overflow: hidden;
  position: fixed;
  top: 0;
}
```

Since we used `position: fixed;` We now add a shim of the same dimensions into the DOM.

```css
.shim {
  height: 40px;
  width: 100%;
}
```

This way we don't have to worry about the top of the container being hidden
behind the header.

Now we have three `div`s inside of our container, `.sticky-at-height`,
`#reference`, and `.side-shim`. `.side-shim` only gets a width style applied to
it when `fixedHeight` is true. Similarly, `#reference` only has its position
fixed when `fixedHeight` is true. We need to include `.side-shim` because fixing
`.sticky-at-height` removes it from the regular flow of inline elements and
something needs to take its place. There are many other ways to do this without
resorting to shims, like floating elements differently, using tables, or flexbox.

With that out of the way, let's turn to how we track the position of a DOM
element to set a variable in state. The EventTarget Web API provides us with
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
and `removeEventListener` which let's us tell the browser to (1) get back to us if
a specific event occurs and (2) what to do then.

```javascript
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
```

Any event listener that was added should also be removed ([why?](https://stackoverflow.com/questions/6033821/do-i-need-to-remove-event-listeners-before-removing-elements/37096563#37096563)).
In React we need to do this on `componentWillUnmount`.
The event listener waits for the user to scroll and whenever that happens, to calls
`handleScroll`.

```javascript
  handleScroll = () => {
    const stickyAtHeight = document.getElementById('reference');
    let top = HEADER_HEIGHT;

    // sometimes element hasn't loaded yet
    if (stickyAtHeight) {
      const rect = stickyAtHeight.getBoundingClientRect();
      top = rect.top;
    }

    if (top < HEADER_HEIGHT && !this.state.fixedHeight) {
      this.setState({ fixedHeight: true });
    } else if (top >= HEADER_HEIGHT && this.state.fixedHeight) {
      this.setState({ fixedHeight: false });
    }
  }
```

This function tries to get the y-coordinate of the top of the `div` with the id
`reference`. Okay, this is clearly a lof of code for something that sounds so
simple... what's up with that? First, we have to make sure that the element
even exists and some users might start scrolling before the page has loaded the
element. If or when it exists, we try to get its coordinates and in particular
the y-coordinate of the top.

Now remember that the coordinate system in the browser has 0 in the upper
lefthand corner and y-coordinates increase as you go down the screen. In our
case this means that when the reference div loads, its y-value is positive
and we want to know when it scrolls past a currently less positive y-value (our
fixed header).

That's what the last `if`-statement inside `handleScroll` checks. Once `top` is less
than `HEADER_HEIGHT`, we know that the `.sticky-at-height` div should stop
scrolling. And if the div is currently sticking to the header and the user scrolls
back up, we want to make sure to unstick it, which is what the `else if`-statement
checks.

If you've been super-attentive and you haven't just been trying to copy down this
code to get it working in your non-toy production code for a deadline that's approaching you
with the business-like indifference of a comet which forced dinosaurs into evolving
into birds, then you might have a question for me now.

"Simon, you're tracking the height of the `div#reference` to set the
height of the `div.sticky-at-height`! (╯°□°)╯︵ ┻━┻. Why would you not just
track it on the element itself instead of needing the extra complication?"

This is left as an exercise for the reader... No, seriously, the reason for it
is that if you track the height of `div.sticky-at-height` directly, you'll
find it flickering and not doing what you'd expect. It flickers between being
stuck to the bottom of header and scrolling past it. The height that the browser
perceives alternates quickly between fixed and relative positioning. Instead
we use the other div as a reference point since that div will always be positioned
relatively and it's height will move continuously instead of being forced to jump.

## Conclusion

In this post we walked through how to create a `div` that only moves within a certain visual
range in the browser using React and the EventTarget Web API. Similar approaches
would work in plain JS or using other frameworks. If you find any errors

## Tidbits

You'll want to change some of my magic numbers to match your styles. You'll also
be able to use CSS preprocessors to leverage CSS variables.

Conditional styling in JS is a little performance hit.

I'd love to play with [custom events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) in the future and see what neat things could be
done with it.



