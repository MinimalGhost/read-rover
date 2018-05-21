import React from 'react';
import { Grid } from 'semantic-ui-react';

const SearchForm = (props) => {
  return (
    <Grid.Column width={16}>
      <form onSubmit={props.handleSubmit}>
        <input
          type='text'
          value={props.term}
          onChange={props.handleChange}
        />
        <input type='submit' value='Search' />
      </form>
    </Grid.Column>
  );
}

export default SearchForm
