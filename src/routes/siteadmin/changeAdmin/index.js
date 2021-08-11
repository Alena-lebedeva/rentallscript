import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ChangeAdmin from './ChangeAdmin';

const title = 'Change Admin Email/Password';

export default {

  path: '/siteadmin/change/admin',

  async action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    return {
      title,
      component: <AdminLayout><ChangeAdmin title={title} /></AdminLayout>,
    };

  },

};
