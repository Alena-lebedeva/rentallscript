import React from 'react';
import Layout from '../../components/Layout';
import WhyHostNew from './WhyHostNew';

const title = 'whyhost';

export default {

  path: '/whyhost',

  action() {
    return {
      title,
      component: <Layout><WhyHostNew title={title} /></Layout>,
    };
  },

};
