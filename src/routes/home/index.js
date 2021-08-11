import React from 'react';
import Home from './Home';
import HomeLayout from '../../components/Layout/HomeLayout';

import { getListingFields } from '../../actions/getListingFields';
import { getHomeBannerImages } from '../../actions/getHomeBannerImages';
import { getStaticBlockInfo } from '../../actions/siteadmin/getStaticBlockInfo';
import { setPersonalizedValues } from '../../actions/personalized';


export default {

  path: '/',

  async action({ store }) {
    const title = store.getState().siteSettings.data.siteTitle;
    const description = store.getState().siteSettings.data.metaDescription;
    const listingFields = store.getState().listingFields.data;
    const layoutType = store.getState().siteSettings.data.homePageType;

    if (listingFields === undefined) {
      store.dispatch(getListingFields());
    }
    await store.dispatch(getHomeBannerImages());
    await store.dispatch(getStaticBlockInfo());
    if (layoutType != 1) {
      await store.dispatch(setPersonalizedValues({ name: 'personCapacity', value: Number(1) }));
    }
    return {
      title,
      description,
      listingFields,
      chunk: 'home',
      component: <HomeLayout layoutType={layoutType}><Home layoutType={layoutType} /></HomeLayout>,
    };
  },

};
