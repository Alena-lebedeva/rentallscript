import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Currency.css';
import currenciesQuery from './currenciesQuery.graphql';
import CurrencyManagement from '../../../components/siteadmin/CurrencyManagement';
import Loader from '../../../components/Loader';

class Currency extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getCurrencies: PropTypes.array,
    })
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render () {
    const { data: { loading, getCurrencies }, title } = this.props;

    if(loading){
      return <Loader type={"text"} />;
    } else {
      return <CurrencyManagement data={getCurrencies} title={title} />
    }
  }

}

export default compose(
    withStyles(s),
    graphql(currenciesQuery),
)(Currency);