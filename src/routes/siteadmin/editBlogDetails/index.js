import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditBlogDetails from './EditBlogDetails';

const title = 'Edit Page Details';

export default {

    path: '/siteadmin/edit/page/:blogId',

    async action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        const blogId = Number(params.blogId);

        return {
            title,
            component: <AdminLayout><EditBlogDetails title={title} blogId={blogId} /></AdminLayout>,
        };
    },

};
