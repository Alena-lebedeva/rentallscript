import React from 'react';
import WishLists from './WishLists';
import Layout from '../../components/Layout';

const title = 'Wish Lists';

export default {

  path: '/wishlists/:id?',

  action({ store, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    let profileId, wishListId;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if (isAuthenticated) {
      profileId = store.getState().account.data.profileId;
    }

    if (params && params.id) {
      wishListId = params.id;
    }

    return {
      title,
      component: <Layout><WishLists
        profileId={profileId}
        wishListId={wishListId}
      />
      </Layout>,
    };
  },

};
