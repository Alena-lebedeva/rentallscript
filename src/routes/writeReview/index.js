import React from 'react';
import Layout from '../../components/Layout';
import WriteReview from './WriteReview';
import NotFound from '../notFound/NotFound';

const title = 'Write Review';

export default {

  path: '/review/write/:reservationId',

  async action({store, params}) {

  	// From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const reservationId = params.reservationId;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if (reservationId === undefined || isNaN(reservationId)) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    return {
      title,
      component: <Layout><WriteReview reservationId={Number(reservationId)} /></Layout>,
    };
  },

};
