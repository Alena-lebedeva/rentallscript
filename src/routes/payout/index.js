import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import PayoutContainer from './PayoutContainer';
import { getPayouts } from '../../actions/Payout/getPayouts';

const title = 'Payout Preferences';

export default {

  path: '/user/payout',

  async action({ store, query }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let currentAccountId = query && query.account;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    await store.dispatch(getPayouts(currentAccountId));

    return {
      title,
      component: <UserLayout><PayoutContainer title={title} currentAccountId={currentAccountId} /></UserLayout>,
    };
  },

};
