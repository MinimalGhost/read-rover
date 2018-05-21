import React from 'react';
import { Header, Image, List, Divider } from 'semantic-ui-react';

const ArticleItem = (props) => {
  return (
      <List.Item className='item' onClick={() => props.handleSelect(props.article)}>
        {
          props.article.urlToImage === null ? null : <Image size='medium' src={props.article.urlToImage} alt='news article' />
        }
        <Header size='small'>{props.article.title}</Header>
        <Header size='small'>{props.article.source.name}</Header>
        <br />
        <p>{props.article.description} <br /> <a href={props.article.url}><br /> Read More</a></p>
        <Divider />
      </List.Item>
  )
}

export default ArticleItem
