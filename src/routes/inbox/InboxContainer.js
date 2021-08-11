import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inbox.css';
import Inbox from '../../components/Inbox';

// Graphql 
import AllThreadsQuery from './AllThreadsQuery.graphql';
class InboxContainer extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    allThreads: PropTypes.object
  };

  render() {
    const { allThreads } = this.props;
    return (

      <div className={s.container}>
        <Inbox allThreads={allThreads} />
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(AllThreadsQuery, {
    name: 'allThreads',
    options: {
      variables: {
        currentPage: 1
      },
      ssr: false,
      pollInterval: 5000,
      fetchPolicy: 'network-only'
    }
  }),
)(InboxContainer);
