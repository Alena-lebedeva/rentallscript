import React from 'react';
import Layout from '../../components/Layout';
import Payment from './Payment';
import NotFound from '../notFound/NotFound';

const title = 'Payment';

export default {

  path: '/payment/:reservationId',

  action({ store, params }) {
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let reservationId = Number(params.reservationId);

    // Check authentication
    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    // Check listId is provided
    if (!reservationId || isNaN(reservationId)) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    return {
      title,
      component: <Layout><Payment title={title} reservationId={reservationId} /></Layout>,
    };
  },

};
