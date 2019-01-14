import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { graphql } from "gatsby";

import Layout from "../../components/layout";

export default ({ data }) => (
  <Layout>
    <h2>Writing</h2>
    <div>
      <h4>{data.allMarkdownRemark.totalCount} Post{data.allMarkdownRemark.totalCount === 1 ? "" : "s"}</h4>
        {data.allMarkdownRemark.edges
          .filter(({ node }) => node.frontmatter.published === "true")
          .map(({ node }) => (
          <Preview key={node.id}>
            <Link to={node.fields.slug}>
              <BlogHeadline>
                {node.frontmatter.title}
              </BlogHeadline>
            </Link>
            <DateLine>— {node.frontmatter.updated_at}</DateLine>
            <p>{node.excerpt}</p>
          </Preview>
        ))}
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___updated_at], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            updated_at(formatString: "MMM D, YYYY")
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

const Preview = styled.div`
  margin-bottom: 40px;
`

const BlogHeadline = styled.h3`
  margin-bottom: 5px;
`

const DateLine = styled.p`
  margin-bottom: 10px;
`
