import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import WhyHostBlock3 from './WhyHostBlock3';
import { restrictUrls } from '../../../../helpers/adminPrivileges'

const title = 'Why Become Host Block 3';

export default {

    path: '/siteadmin/whyHost/Block3',

    async action({ store }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        if (!restrictUrls('/siteadmin/whyHost/Block3', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><WhyHostBlock3 title={title} /></AdminLayout>,
        };
    },

};
