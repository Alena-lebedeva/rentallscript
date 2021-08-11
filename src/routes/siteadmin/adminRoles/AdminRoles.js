import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminRoles.css';
import adminRolesQuery from './adminRolesQuery.graphql';
import AdminRolesManagement from '../../../components/siteadmin/AdminRolesManagement';
import Loader from '../../../components/Loader';

class AdminRoles extends React.Component {

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
    }
  };

  render () {
    const { data: { loading, getAllAdminRoles }, title } = this.props;

    if(loading){
      return <Loader type={"text"} />;
    } else {
      return <AdminRolesManagement data={getAllAdminRoles} title={title} />
    }
  }

}

export default compose(
    withStyles(s),
    graphql(adminRolesQuery, {
      options: {
        fetchPolicy: 'network-only'
      }
    }),
)(AdminRoles);