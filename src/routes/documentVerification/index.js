import React from 'react';
import Layout from '../../components/Layout';

import UserLayout from '../../components/Layout/UserLayout';

import DocumentVerification from './DocumentVerification';

const title = 'DocumentVerification';

export default {

  path: '/document-verification',

  action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;


    if (!isAuthenticated) {
      return { redirect: '/login' };
    }


    let account = store.getState().account;

    if (account) {
      let document = account.data.verification.isIdVerification;
      if (document == true) {
        return { redirect: '/user/verification' };
      }
    }

    return {
      title,
      component: <UserLayout><DocumentVerification title={title} /></UserLayout>,
    };
  },

};


