import React from 'react';
import Layout from '../../components/Layout';
import PasswordVerification from './PasswordVerification';
import NotFound from '../notFound/NotFound';

const title = 'Forgot Password';

export default {

  path: '/password/verification',

  action({ store, query }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let email, token;
    if (isAuthenticated) {
      return { redirect: '/' };
    }

    if ('token' in query && 'email' in query) {
      email = query.email;
      token = query.token
    } else {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404,
      };
    }

    return {
      title,
      component: <Layout><PasswordVerification email={email} token={token} title={title} /></Layout>,
    };
  },

};
