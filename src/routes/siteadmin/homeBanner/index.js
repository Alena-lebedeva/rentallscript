import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import HomeBanner from './HomeBanner';
import { getHomeBannerImages } from '../../../actions/getHomeBannerImages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Home Banner';

export default {

  path: '/siteadmin/home/home-banner',

  async action({ store , dispatch}) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    await store.dispatch(getHomeBannerImages())

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/home/home-banner', adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><HomeBanner title={title} /></AdminLayout>,
    };
  },

};
