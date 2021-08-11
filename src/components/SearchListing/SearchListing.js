import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchListing.css';

// Components
import SearchForm from './SearchForm';
//import SearchResults from './SearchResults';
import MapResults from './MapResults';

class SearchListing extends React.Component {
  static propTypes = {};
  render() {
    return (
      <div>
        <SearchForm />
        <MapResults />
      </div>
    );
  }
}

export default withStyles(s)(SearchListing);
