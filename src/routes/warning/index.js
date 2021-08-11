import React from 'react';
import Layout from '../../components/Layout';
import Warning from './Warning';

const title = 'Page Not Found';

export default {

  path: '/warning',

  action() {
    return {
      title,
      component: <Layout><Warning title={title} /></Layout>,
      status: 404,
    };
  },

};
