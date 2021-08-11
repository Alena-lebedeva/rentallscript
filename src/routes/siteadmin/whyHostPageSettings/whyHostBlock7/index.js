import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import WhyHostBlock7 from './WhyHostBlock7';
import { restrictUrls } from '../../../../helpers/adminPrivileges'

const title = 'Why Become Host Block 7';

export default {

    path: '/siteadmin/whyHost/Block7',

    async action({ store }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        if (!restrictUrls('/siteadmin/whyHost/Block7', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><WhyHostBlock7 title={title} /></AdminLayout>,
        };
    },

};
