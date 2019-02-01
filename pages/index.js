import React, { Component } from 'react'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default class extends Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:1337/articles')
    const articles = await res.json()
    return { articles }
  }
  componentWillMount() {
    this.setState({
      articles: this.props.articles
    })
  }
  render() {
  	const ArticleLink = (props) => (
	  <li>
	    <Link as={`/articles/${props.id}`} href={`/article?title=${props.id}`}>
			<a>{props.title}</a>
	    </Link>
			<h1>{props.content}</h1>
	  </li>
	)
    return (
      <Layout>
         {
          this.state.articles.map((article) => 
			<ul>
				<ArticleLink id={`${article.id}`} title={`${article.title}`} content={`${article.content}`} />
			</ul>
          	)
         }
      </Layout>
    )
  }
}

