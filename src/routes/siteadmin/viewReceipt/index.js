import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ReceiptContainer from './ReceiptContainer';

const title = 'View Receipt';

export default {

  path: '/siteadmin/receipt/:reservationId',

  async action({store, params}) {

  	// From Redux Store
    const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    const data = store.getState().reservation.data;
    //const reservationId = params.reservationId;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    if(!data) {
      return { redirect: '/siteadmin/reservations' };
    }

    return {
      title,
      component: <AdminLayout><ReceiptContainer title={title} data={data} /></AdminLayout>,
    };
  },

};
