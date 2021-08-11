import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Messages from './Messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'Messages';

export default {

    path: '/siteadmin/messages',

    async action({ store }) {


        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/messages', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><Messages title={title} /></AdminLayout>,
        };
    },

};
