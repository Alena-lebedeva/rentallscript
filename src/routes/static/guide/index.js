import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';

export default {

  path: '/guide',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./guide.md'));
      }, 'guide');
    });

    return {
      title: data.title,
      chunk: 'guide',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
