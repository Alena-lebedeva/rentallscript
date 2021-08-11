import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditUser from './EditUser';
import fetch from '../../../core/fetch';
import NotFound from '../../notFound/NotFound';

const title = 'Edit User';

export default {

  path: '/siteadmin/user/edit/:profileId',

  async action({ store, params }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    const profileId = Number(params.profileId);

    return {
      title,
      component: <AdminLayout><EditUser title={title} profileId={profileId} /></AdminLayout>,
    };
  },

};
