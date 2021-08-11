import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import EditProfile from './EditProfile';
import { setSiteSettings } from '../../actions/siteSettings';

const title = 'Edit Profile';

export default {

  path: '/user/edit',

  async action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    await store.dispatch(setSiteSettings());

    return {
      title,
      component: <UserLayout><EditProfile title={title} /></UserLayout>,
    };
  },

};
