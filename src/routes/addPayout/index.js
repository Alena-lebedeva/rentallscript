import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import AddPayoutContainer from './AddPayoutContainer';

const title = 'Add Payout Preferences';

export default {

  path: '/user/addpayout',

  action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    let accountData = store.getState().account.data;

    return {
      title,
      component: <UserLayout><AddPayoutContainer title={title} initialData={accountData} /></UserLayout>,
    };
  },

};
