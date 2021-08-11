import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import WhyHostBlock4 from './WhyHostBlock4';
import { restrictUrls } from '../../../../helpers/adminPrivileges'

const title = 'Why Become Host Block 4';

export default {

    path: '/siteadmin/whyHost/Block4',

    async action({ store }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        if (!restrictUrls('/siteadmin/whyHost/Block4', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><WhyHostBlock4 title={title} /></AdminLayout>,
        };
    },

};
