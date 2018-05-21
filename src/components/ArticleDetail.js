import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

const ArticleDetail = (props) => {
  return (
    <Container className='detail' width={16}>
      <Header size='large'>{props.selected.title}</Header>
      {
        !props.selected.urlToImage === null ? <Image size='big' src='../logo.svg' alt='news article' /> : <Image size='big' src={props.selected.urlToImage} alt='news article' />
      }
      <br />
      <p>{props.selected.description} <a href={props.selected.url}><br /><br /> Read More </a></p>
    </Container>
  )
}

export default ArticleDetail
