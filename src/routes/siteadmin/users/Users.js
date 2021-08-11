import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Users.css';

// Query
import usersQuery from './usersQuery.graphql';

// Component
import UserManagement from '../../../components/siteadmin/UserManagement';
import Loader from '../../../components/Loader';

class Users extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    userManagement: PropTypes.shape({
      loading: PropTypes.bool,
      userManagement: PropTypes.array,
    })
  };

  static defaultProps = {
    userManagement: {
      loading: true
    }
  };

  render () {
    const { userManagement: { loading, userManagement }, title } = this.props;
    if(loading){
      return <Loader type={"text"} />;
    } else {
      return <UserManagement userManagement={userManagement} title={title} />;
    }
  }

}

export default compose(
    withStyles(s),
    // graphql(usersQuery),
    graphql(usersQuery, {
      name: 'userManagement',
      options: {
        variables: {
          currentPage: 1,
          searchList: ''
        },
        fetchPolicy: 'network-only'
      }
    }),
)(Users);
