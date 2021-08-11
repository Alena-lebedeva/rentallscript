import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import BlogManagement from './BlogManagement';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Content Management System';

export default {

    path: '/siteadmin/content-management',

    async action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/content-management', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><BlogManagement title={title} /></AdminLayout>,
        };
    },

};
