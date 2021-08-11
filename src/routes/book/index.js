import React from 'react';
import Layout from '../../components/Layout';
import Book from './Book';
import NotFound from '../notFound/NotFound';

const title = 'Booking';

export default {

  path: '/book/:hostingId',

  action({ store, params }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let bookingData = store.getState().book.data;
    let hostingId = params.hostingId;

    // Check authentication
    if (!isAuthenticated) {
      return { redirect: '/login?refer=/rooms/' + hostingId };
    }

    // Check listId is provided
    if (!hostingId) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    // Check redux store for booking data
    if (!bookingData) {
      return { redirect: '/rooms/' + hostingId };
    }

    return {
      title,
      component: <Layout><Book title={title} /></Layout>,
    };
  },

};