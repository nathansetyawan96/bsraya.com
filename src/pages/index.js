import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { Link, graphql } from "gatsby"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { rhythm } from "../utils/typography"

export default function Blog({ data }) {
    return (
        <Layout>
            <Seo title="Blog" type="website" slug="/blog/" />
            <h5>Blogposts</h5>
            <Posts metadata={data} />
        </Layout>
    )
}

function Posts({ metadata }) {
    const posts = metadata.allMdx.edges
    return (
        <>
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
                            const tags = post.node.frontmatter.tags
                            return (
                                <li
                                    style={{
                                        marginBottom: `4rem`
                                    }}
                                    key={link}
                                >
                                    <Post link={link} title={title} date={date} />
                                    <ul className="tag-list">
                                        {
                                            tags.map(tag => <li className="tag">{tag}</li>)
                                        }
                                    </ul>
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
        <div style={{marginBottom: rhythm(1)}}>
            <hr style={{borderTop: `1px solid var(--fontColor)`, marginBottom: rhythm(0.5)}}/>
            <p itemProp="datePosted" style={{ color: `gray`, marginBottom: rhythm(0.25)}}>{date}</p>
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
        </div>
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
                        tags
                    }
                }
            }
        }
    }
`