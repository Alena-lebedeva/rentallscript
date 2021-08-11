import React from 'react';
import Layout from '../../components/Layout';
import Policies from './Policies';

const title = 'Cancellation Policies';

export default {

  path: '/cancellation-policies/:type?',

  action({ params }) {

    // From URL
    const policyType = params.type;

    return {
      title,
      component: <Layout><Policies policyType={policyType} /></Layout>,
    };
  },

};