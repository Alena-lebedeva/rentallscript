import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ProfilePhotoContainer from './ProfilePhotoContainer';

const title = 'Profile Photo';

export default {

  path: '/user/photo',

  action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <UserLayout><ProfilePhotoContainer /></UserLayout>,
    };
  },

};
