import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SocialLinks from "../components/socialLinks";

export default () => (
  <Layout>
    <div>
      <h2>About Simon</h2>
      <p>
        <SocialLinks />
      </p>
      <p>
        I am currently working as a
        full-stack software engineer. To me, that full
        stack extends from empathy interviews with end users all the way to
        database, infrastructure architecture, and deploying code.
        I do my best to let the problem choose the solution, rather than the
        other way around.
      </p>
      <p>
        I am currently working with Rails, React, and Postgres. I have
        also worked with Django and various other frameworks and
        technologies as well as on the business side of tech.
      </p>
      <p>
        I was born and raised in Germany, educated at Harvard and Oxford,
        and have worked in tech companies from early-stage startups to large
        organizations in advocacy, fintech, and healthcare.
      </p>
      <p>
        In my <Link to={"/writing"}>blog</Link> you will find topics that interest me and problems that
        I've solved on the job or working on personal projects.
      </p>
      <p>
        Feel free to contact me if you are hiring, have an
        interesting opportunity of a different nature, found errors or
        incorrect statements in my writings, or just want to say hi and
        ask a question.
      </p>
    </div>
  </Layout>
);
