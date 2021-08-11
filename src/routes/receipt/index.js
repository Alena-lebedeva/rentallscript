import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ReceiptContainer from './ReceiptContainer';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';

const title = 'View Receipt';

export default {

  path: '/users/trips/receipt/:reservationId',

  async action({ store, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const reservationId = params.reservationId;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if (!reservationId) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    return {
      title,
      component: <UserLayout><ReceiptContainer title={title} reservationId={Number(reservationId)} /></UserLayout>,
    };
  },

};
