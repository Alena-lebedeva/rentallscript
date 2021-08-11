import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditStaticPage from './EditStaticPage';
import { restrictUrls } from '../../../helpers/adminPrivileges';
    
const title = 'Edit Page Details';

export default {

    path: '/siteadmin/edit/staticpage/:pageId',

    async action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;
    
        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/edit/staticpage/', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }  

        const pageId = Number(params.pageId);

        return {
            title,
            component: <AdminLayout><EditStaticPage title={title} pageId={pageId} /></AdminLayout>,
        };
    },

};
