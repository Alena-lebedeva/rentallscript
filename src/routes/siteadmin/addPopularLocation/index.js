import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AddPopularLocation from './AddPopularLocation';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Add Popular Location';

export default {

    path: '/siteadmin/popularlocation/add',

    async action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/popularlocation/add', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><AddPopularLocation title={title} /></AdminLayout>,
        };
    },

};
