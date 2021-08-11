import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import BannerSettings from './BannerSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Banner Settings';

export default {

  path: '/siteadmin/home/caption',

  async action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/home/caption', adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><BannerSettings title={title} /></AdminLayout>,
    };
  },

};
