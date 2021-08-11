import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';

export default {

  path: '/policies',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./policies.md'));
      }, 'policies');
    });

    return {
      title: data.title,
      chunk: 'policies',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
