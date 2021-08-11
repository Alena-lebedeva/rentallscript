import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import UserReviews from './UserReviews';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'Users Reviews';

export default {

    path: '/siteadmin/user-reviews',

    async action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/user-reviews', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><UserReviews title={title} /></AdminLayout>,
        };
    },

};
