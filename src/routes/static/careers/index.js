import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';

export default {

  path: '/careers',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./careers.md'));
      }, 'careers');
    });

    return {
      title: data.title,
      chunk: 'careers',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
