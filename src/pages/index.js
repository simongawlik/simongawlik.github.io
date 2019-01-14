import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import SocialLinks from "../components/socialLinks";
import { graphql } from "gatsby";

export default ({ data }) => (
  <Layout>
    <div>
      <p>
        <SocialLinks />
      </p>
      <p>
        Welcome to my website. I am currently working as a
        full-stack software engineer. I've also worked in consulting
        and product/project management. To me, a full
        stack extends from empathy interviews with end users all the way to
        database, infrastructure architecture, and deploying code.
        I do my best to let the problem choose the solution, rather than the
        other way around.
      </p>
      <p>
        You can find out more about me in the <Link to="">About</Link> section.
      </p>
      <p>
        Feel free to reach out with any questions, corrections, or to talk about
        exciting things and opportunities that you're working on.
      </p>

      <RecentBlogSection>
        <h3>Recent Blog Posts</h3>

        {data.allMarkdownRemark.edges
          .filter(({ node }) => node.frontmatter.published === "true")
          .slice(0, 3)
          .map(({ node }) => (
          <div key={node.id}>
            <BlogHeadline>{`${node.frontmatter.updated_at}: `}
              <Link to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </BlogHeadline>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </RecentBlogSection>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___updated_at], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            updated_at(formatString: "M/D/YYYY")
            published
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`

const RecentBlogSection = styled.div`
  margin-top: 50px;
`

const BlogHeadline = styled.h4`
  margin-bottom: 5px;
`
