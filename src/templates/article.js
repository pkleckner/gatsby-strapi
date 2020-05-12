import React from "react"  
import { graphql } from "gatsby"

import ReactMarkdown from "react-markdown"  
import Moment from "react-moment"

import Layout from "../components/layout"

export const query = graphql`  
  query ArticleQuery($id: Int!) {
    strapiArticle(strapiId: { eq: $id }) {
      strapiId
      title
      content
      published_at
      dynamic {
        content_band {
          article
        }
      }
      image {
        publicURL
      }
    }
    allStrapiArticle {
      edges {
        node {
          strapiId
        }
      }
    }
  }
`

const Article = ({ data }) => {  
  const article = data.strapiArticle
  const allArticle = data.allStrapiArticle

  let bandId

  return (
    <Layout>
      <div>
        <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
          data-src={article.image.publicURL}
          data-srcset={article.image.publicURL}
          data-uk-img
        >
          <h1>{article.title}</h1>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <ReactMarkdown source={article.content} />
            <p>
              <Moment format="MMM Do YYYY">{article.published_at}</Moment>
            </p>
            {article.dynamic.map((bands, i) => {
              return (
                bands.content_band !== null ?
                  (bandId = bands.content_band.article,

                  allArticle.edges.map((nodes, j) => {
                    return (nodes.node.strapiId === bandId ? <a href={"/article/" + bandId}>Article {bandId}</a> : ``)
                  }))
                : ``
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Article