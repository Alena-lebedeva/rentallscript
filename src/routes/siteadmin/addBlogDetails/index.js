import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AddBlogDetails from './AddBlogDetails';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Add Page Details';

export default {

    path: '/siteadmin/page/add',

    async action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;
    


        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/page/add', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><AddBlogDetails title={title} /></AdminLayout>,
        };
    },

};
