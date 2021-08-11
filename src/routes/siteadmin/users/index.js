import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Users from './Users';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'User Management';

export default {

  path: '/siteadmin/users',

  async action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/users', adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><Users title={title} /></AdminLayout>,
    };
  },

};
