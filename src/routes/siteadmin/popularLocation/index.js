import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import PopularLocation from './PopularLocation';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Popular Locations';

export default {

    path: '/siteadmin/popularlocation',

    async action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/popularlocation', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><PopularLocation title={title} /></AdminLayout>,
        };
    },

};
