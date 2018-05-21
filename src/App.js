import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import SearchForm from './components/SearchForm';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import config from './config';
import { Grid } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  state = {
    articles: [],
    term: '',
    selected: '',
    source: ''
  }

  componentDidMount() {
    this.topSearch();
  }

  // initial fetch request to populate page
  topSearch = () => {
    let validSources = []
    return fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.API_KEY}`
    ).then(res => res.json())
    .then(json => {
      // filter only notable news sources, for compatibility with association feature
      for (let i = 0; i < json.articles.length; i++) {
        if (json.articles[i].source.id !== null) {
          validSources.push(json.articles[i])
        }
      }
      this.setState({
        articles: validSources,
        selected: validSources[0]
      });
    });
  }

  // fetch based on search field user input
  userSearch = () => {
    let validSources = []
    return fetch(
      `https://newsapi.org/v2/everything?q=${this.state.term}&apiKey=${config.API_KEY}`
    ).then(res => res.json())
    .then(json => {
      // filter only notable news sources, for compatibility with association feature
      for (let i = 0; i < json.articles.length; i++) {
        if (json.articles[i].source.id !== null) {
          validSources.push(json.articles[i])
        }
      }
      // ensure there is something to render in the response, otherwise alert user
      if (validSources.length > 0) {
        this.setState({
          articles: validSources,
          selected: validSources[0]
        });
      } else {
        this.props.alert.show('Sorry, no search results matched!')
      }
    });
  }

  // update state with only articles from associated news source clicked
  sourceSearch = () => {
    return fetch(
      `https://newsapi.org/v2/top-headlines?sources=${this.state.source}&apiKey=${config.API_KEY}`
    ).then(res => res.json())
    .then(json => {
      this.setState({
        articles: json.articles
      });
    });
  }

  // sort currently rendered list alphabetically
  sortByTitle = () => {
    let sorted = this.state.articles.sort(function(a,b) {
      let bPub = b.title.split(' ')
      let aPub = a.title.split(' ')

      if(aPub[0] < bPub[0]) return -1;
      if(aPub[0] > bPub[0]) return 1;
      return 0;
    });
    this.setState({
      articles: sorted
    });
  }

  // updates the state on search field input
  handleChange = (event) => {
    this.setState({
      term: event.target.value
    });
  }

  // on enter or submit button clicked fire fetch
  handleSubmit = (event) => {
    event.preventDefault();
    this.userSearch();
  }

  // displays the clicked list item in detail panel
  handleSelect = (selected) => {
    if (selected.source.id) {
      this.setState({
        selected: selected,
        source: selected.source.id
      })
      setTimeout(() => {
        this.sourceSearch();
      }, 50)
    } else {
      this.setState({ selected })
    }
  }

  render() {
    return (
      <div>
      <Grid celled verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={16}>
            <SearchForm
              term={this.state.term}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={10}>
            <ArticleDetail selected={this.state.selected} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ArticleList
              articles={this.state.articles}
              handleSelect={this.handleSelect}
              sortByTitle={this.sortByTitle}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    );
  }
}

export default withAlert(App);
