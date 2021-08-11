import React from 'react';
import PropTypes from 'prop-types';
import {graphql, gql, compose} from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchSettings.css';

// Component
import SearchSettingsForm from '../../../components/siteadmin/SearchSettingsForm';
import Loader from '../../../components/Loader';

class SearchSettings extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getSearchSettings: PropTypes.object,
    })
  };  

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render () {
    const { data: { loading, getSearchSettings }, title } = this.props;
    if(loading){
      return <Loader type={"text"} />;
    } else {
      return <SearchSettingsForm initialValues={getSearchSettings} title={title} />
    }
  }
}

export default compose(
    withStyles(s),
    graphql(gql `
        {
          getSearchSettings{
            id
            minPrice
            maxPrice
            priceRangeCurrency
          }
        }
      `,
      {
        options: {
          fetchPolicy: 'network-only'
        }
      }    
    ),
)(SearchSettings);
