import React from 'react';
import Layout from '../../components/Layout';
import Content from './Content';
import { getContent } from '../../actions/content';
import { selectContent } from '../../reducers/content';

export default {

  path: '*',

  async action({ path, store }) { // eslint-disable-line react/prop-types
    try {
      await store.dispatch(getContent({ path }));
      const data = selectContent(store.getState(), { path });
      if (!data || !data.content) {
        return undefined;
      }
      return {
        title: data.title,
        component: <Layout><Content path={path} /></Layout>,
      };
    } catch (e) {
      throw new Error(e);
    }
  },

};
