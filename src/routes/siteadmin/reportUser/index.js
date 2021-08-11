import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ReportUser from './ReportUser';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'Report User';

export default {

    path: '/siteadmin/reportUser',

    async action({ store }) {


        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/reportUser', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><ReportUser title={title} /></AdminLayout>,
        };
    },

};
