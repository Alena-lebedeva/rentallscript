import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ProfileView from './ProfileView';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'Profile Verified View';

export default {

    path: '/siteadmin/profileView/:profileId?',

    async action({ store, params }) {


        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }


        const data = store.getState().account.data;
        const profileId = params.profileId;
        let profile = 0;
        let isUser = false;
        if(profileId === null || profileId === undefined) {
          if(data) {
            isUser = true;
          }
        } else {
          profile = Number(profileId);
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/profileView/', adminPrivileges)) {
          return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><ProfileView title={title} profileId={profile} /></AdminLayout>,
        };
    },

};
