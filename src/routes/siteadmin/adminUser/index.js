import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AdminUser from './AdminUser';

const title = 'Manage Admin Users';

export default {

  path: '/siteadmin/admin-users',

  async action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    return {
      title,
      component: <AdminLayout><AdminUser title={title} /></AdminLayout>,
    };
  },

};
