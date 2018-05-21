import React from 'react';
import ArticleItem from './ArticleItem';
import { List, Button } from 'semantic-ui-react';

const ArticleList = (props) => {
  let renderedArticles = props.articles.map(
    article =>
    <ArticleItem
      key={article.url}
      article={article}
      handleSelect={props.handleSelect}
    />
  )

  return (
    <List className='list'>
      <Button className='sort' onClick={props.sortByTitle}>Sort by Title</Button>
      {renderedArticles}
    </List>
  )
}

export default ArticleList
