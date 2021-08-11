import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Layout from '../../../components/Layout';
import ListSettings from './ListSettings';
import NotFound from '../../notFound/NotFound';
import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'List Settings';

export default {

  path: '/siteadmin/listsettings/:typeId',

  async action({ params, store }) {

    // Params
    const typeId = params.typeId;

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/listsettings/' + typeId, adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    if(typeId != undefined && !isNaN(typeId)){
      store.dispatch(getAdminListingSettings(typeId));
    } else {
        return {
          title,
          component: <Layout><NotFound title={title} /></Layout>,
          status: 404
        };
    }

    return {
      title,
      component: <AdminLayout><ListSettings /></AdminLayout>,
    };
  },
};
