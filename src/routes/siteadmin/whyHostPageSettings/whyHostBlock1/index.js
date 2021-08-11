import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import WhyHostBlock1 from './WhyHostBlock1';
import { restrictUrls } from '../../../../helpers/adminPrivileges'

const title = 'Why Become Host Block 1';

export default {

    path: '/siteadmin/whyHost/Block1',

    async action({ store }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        if (!restrictUrls('/siteadmin/whyHost/Block1', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><WhyHostBlock1 title={title} /></AdminLayout>,
        };
    },

};
