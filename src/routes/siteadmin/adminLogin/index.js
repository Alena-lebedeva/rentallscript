import React from 'react';
import HeadLessLayout from '../../../components/Layout/HeadLessLayout';
import AdminLogin from './AdminLogin';

const title = 'Admin Log In';

export default {

  path: '/siteadmin/login',

  action(context) {

    // From Redux Store
    let isAdminAuthenticated = context.store.getState().runtime.isAdminAuthenticated;

    if (isAdminAuthenticated) {
      return { redirect: '/siteadmin/users' };
    }

    return {
      title,
      chunk: 'adminLogin',
      component: <HeadLessLayout><AdminLogin title={title} /></HeadLessLayout>,
    };
  },

};
