import React from 'react';
import Layout from '../../components/Layout';
import ListNotFound from './ListNotFound';

const title = 'Page Not Found';

export default {

  path: '*',

  action() {
    return {
      title,
      component: <Layout><ListNotFound title={title} /></Layout>,
      status: 404,
    };
  },

};
