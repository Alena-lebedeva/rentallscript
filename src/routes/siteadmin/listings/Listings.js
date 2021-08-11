import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Listings.css';

// Query
import listingsQuery from './listingsQuery.graphql';

// Component
import ListingManagement from '../../../components/siteadmin/ListingManagement';
import Loader from '../../../components/Loader';

class Listings extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    getAllListings: PropTypes.shape({
      loading: PropTypes.bool,
      getAllListings: PropTypes.array,
    })
  };

  static defaultProps = {
    getAllListings: {
      loading: true
    }
  };

  render() {
    const { getAllListings: { loading, getAllListings }, title } = this.props;
    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return <ListingManagement getAllListings={getAllListings} title={title} />;
    }
  }

}

export default compose(
  withStyles(s),
  // graphql(listingsQuery),
  graphql(listingsQuery, {
    name: 'getAllListings',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only'
    }
  }),
)(Listings);
