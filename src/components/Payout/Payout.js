import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payout.css';

// Component
import PayoutList from './PayoutList';
import EmptyList from './PayoutList/EmptyList';
import Loader from '../Loader';

class Payout extends Component {
  static defaultProps = {
    loading: true,
    data: []
  }

  constructor(props) {
    super(props);

    this.state = {
      initialLoad: true
    };
  }

  componentDidMount() {
    this.setState({
      initialLoad: false
    });
  }

  render() {
    const { data, loading, currentAccountId } = this.props;
    const { initialLoad } = this.state;

    if (loading && initialLoad) {
      return <Loader type={"text"} />;
    } else {
      if(data != undefined && data.length > 0){
        return <PayoutList data={data} currentAccountId={currentAccountId} />;
      } else {
        return <EmptyList />;
      }
    }
  }
}

const mapState = (state) => ({
  data: state.payout.data,
  loading: state.payout.getPayoutLoading
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Payout));