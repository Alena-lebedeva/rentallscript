import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminUser.css';
import adminUserQuery from './adminUserQuery.graphql';
import adminRolesQuery from './adminRolesQuery.graphql';
import AdminUserManagement from '../../../components/siteadmin/AdminUserManagement';
import Loader from '../../../components/Loader';

class AdminUser extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllAdminRoles: PropTypes.array,
    })
  };

  static defaultProps = {
    data: {
      loading: true
    },
    adminRoles: {
      getAllAdminRoles: []
    }
  };

  render () {
    const { data: { loading, getAllAdminUsers }, title } = this.props;
    const { adminRoles: { getAllAdminRoles } } = this.props;

    if(loading){
      return <Loader type={"text"} />;
    } else {
      return <AdminUserManagement data={getAllAdminUsers} roles={getAllAdminRoles} title={title} />
    }
  }

}

export default compose(
    withStyles(s),
    graphql(adminUserQuery, {
      options: {
        fetchPolicy: 'network-only'
      }
    }),
    graphql(adminRolesQuery, {
      name: 'adminRoles',
      options: {
        fetchPolicy: 'network-only',
        ssr: true
      }
    }) 
)(AdminUser);