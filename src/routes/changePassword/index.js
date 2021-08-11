import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ChangePasswordContainer from './ChangePasswordContainer';

const title = 'Change Password';

export default {

  path: '/users/security',

  action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <UserLayout><ChangePasswordContainer title={title} /></UserLayout>,
    };
  },

};
