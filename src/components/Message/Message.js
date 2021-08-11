import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { graphql, gql, compose } from 'react-apollo';
import NavLink from '../NavLink';

// Graphql
import UnreadThreadsQuery from './getUnreadThreads.graphql';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Message.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Locale
import messages from '../../locale/messages';

class Message extends Component {
  static propTypes = {
    allUnreadThreadsCount: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUnreadCount: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }),
    }),
  };

  static defaultProps = {
    allUnreadThreadsCount: {
      loading: true,
      getUnreadCount: {
        total: 0,
      },
    },
  };

  render() {
    const { allUnreadThreadsCount: { loading, getUnreadCount } } = this.props;
    let count = 0;
    if (!loading && getUnreadCount != null) {
      count = getUnreadCount.total != null ? getUnreadCount.total : 0;
    }
    const isNewMessage = count > 0;

    return (
      <NavLink to="/inbox">
        <span><FormattedMessage {...messages.messages} /></span>
        {
          isNewMessage && <FontAwesome.FaCircle className={s.notification} />
        }
      </NavLink>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(UnreadThreadsQuery, {
    name: 'allUnreadThreadsCount',
    options: {
      ssr: false,
      pollInterval: 5000,
    },
  }),
)(Message);
