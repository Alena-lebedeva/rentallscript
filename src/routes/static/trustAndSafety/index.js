import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
import fetch from '../../../core/fetch';

const query = `query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      id
      pageName
      content
      metaTitle
      metaDescription
      createdAt
  }
}`;

export default {

  path: '/safety',

  async action({ locale }) {
    const dataResult = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./trustAndSafety.md'));
      }, 'trustAndSafety');
    });
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: { id: 2 },
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getEditStaticPage) {
      return {
        title: data.getEditStaticPage.metaTitle,
        description: data.getEditStaticPage.metaDescription,
        chunk: 'about',
        component: <Layout><Page
          html={data.getEditStaticPage.content}
          title={data.getEditStaticPage.metaTitle}
        /></Layout>,
      };

    } else {
      return {
        title: dataResult.title,
        chunk: 'trustAndSafety',
        component: <Layout><Page {...dataResult} /></Layout>,
      };
    }
  },

};
