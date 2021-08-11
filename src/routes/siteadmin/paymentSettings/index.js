import React from 'react';
import Layout from '../../../components/Layout';
import PaymentSettings from './PaymentSettings';
import fetch from '../../../core/fetch';
import NotFound from '../../notFound/NotFound';

const title = 'Payment Settings';

export default {

  path: '/siteadmin/settings/payment',

  async action(context) {

    // From Redux Store
    let isAdminAuthenticated = context.store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    const query = `
        query($id: Int){
          getPaymentInfo(id: $id) {
            id
            paymentName
            paymentStatus
            paymentMode,
            email,
            APIUserId,
            APIPassword,
            APISecret,
            AppId 
          }
        }
    `;

    // For now PayPal
    const params = {
      id: 1
    };

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: params
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getPaymentInfo) {
      return {
        title,
        component: <Layout><PaymentSettings title={title} initialValues={data.getPaymentInfo} /></Layout>,
      };
    } else {
        return {
          title,
          component: <Layout><NotFound title={title} /></Layout>,
          status: 404,
        };
    };


  },

};
