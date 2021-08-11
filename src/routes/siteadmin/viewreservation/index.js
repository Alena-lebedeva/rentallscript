import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ViewReservationroute from './ViewReservationroute';
import { restrictUrls } from '../../../helpers/adminPrivileges';


const title = 'Reservation Details';

export default {

    path: '/siteadmin/viewreservation/:id',

    async action({ store, params }) {


        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/viewreservation/', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }
        const id=params.id;
        return {
            title,
            component: <AdminLayout><ViewReservationroute title={title} id={Number(id)}/></AdminLayout>,
        };
    },

};
