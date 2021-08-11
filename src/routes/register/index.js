import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';

const title = 'New User Registration';

export default {

  path: '/register',

  action({ store, query }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let refer = query.refer;

    if (isAuthenticated) {
      return { redirect: '/' };
    }

    return {
      title,
      component: <Layout><Register title={title} refer={refer} /></Layout>,
    };
  },

};
