import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import WhyHostBlock2 from './WhyHostBlock2';
import { restrictUrls } from '../../../../helpers/adminPrivileges'

const title = 'Why Become Host Block 2';

export default {

    path: '/siteadmin/whyHost/Block2',

    async action({ store }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        if (!restrictUrls('/siteadmin/whyHost/Block2', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><WhyHostBlock2 title={title} /></AdminLayout>,
        };
    },

};
