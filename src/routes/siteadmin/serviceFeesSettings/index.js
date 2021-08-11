import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ServiceFeesSettings from './ServiceFeesSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'Service Fees Settings';

export default {

  path: '/siteadmin/settings/servicefees',

  async action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/settings/servicefees', adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><ServiceFeesSettings title={title} /></AdminLayout>,
    };
  },

};
