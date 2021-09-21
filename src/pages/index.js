import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link, graphql } from "gatsby"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

export default function Blog({data}) {
    return (
        <Layout>
            <Seo title="Blog" type="website" slug="/blog/" />
            <Posts metadata={data} />
        </Layout>
    )
}

function Posts({ metadata }) {
    const posts = metadata.allMdx.edges
    return (
      <>
        <div style={{ marginBottom: `3rem` }}>
          <p style={{ margin: `0` }}>A personal blog by Bijon Setyawan Raya.</p>
          <p>I code, and I teach stuff that I learn.</p>
        </div>
        <ol
            style={{
                listStyle: `none`,
                margin: `0`,
                padding: `0`
            }}
            itemType="http://schema.org/Blogs"
            itemScope
        >
            {
                posts.map(
                    post => {
                        const title = post.node.frontmatter.title || post.node.fields.slug
                        const link = post.node.fields.slug
                        const date = post.node.frontmatter.date
                        return (
                            <li
                                style={{
                                    marginBottom: `2em` 
                                }}
                                key={link}
                            >
                                <Post link={link} title={title} date={date} />
                            </li>
                        )
                    }
                )
            }
        </ol>
      </>
    )
}

function Post({ link, title, date }) {
    return (
        <>
            <h1 style={{ margin: `0` }}>
                <Link
                    to={link} 
                    itemProp="url"
                    className="post"
                    onClick={() => {
                            trackCustomEvent({
                                category: title,
                                action: "click",
                                label: "View a blogpost"
                            })
                        }
                    } 
                >
                    <span itemProp="headline">{title}</span>
                </Link>
            </h1>
            <small itemProp="datePosted">{date}</small>
        </>
    )
}

export const blogpostQuery = graphql`
    query blogpostQuery{
        allMdx(
            filter: {fields: {collection: {eq: "blog"}}, frontmatter: {published: {eq: true}}}, 
            sort: {fields: frontmatter___date, order: DESC}
        )   
        {
            edges{
                node {
                    fields{
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                    }
                }
            }
        }
    }
`