import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import TripsContainer from './TripsContainer';

const title = 'Trips';

export default {

  path: '/trips/:type',

  action({ store, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const type = params.type;
    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <UserLayout><TripsContainer userType="guest" type={type} /></UserLayout>,
    };
  },

};
