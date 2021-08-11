import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditReview from './EditReview';

const title = 'Admin Reviews';

export default {

    path: '/siteadmin/edit-review/:reviewId',

    async action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        const reviewId = Number(params.reviewId);

        return {
            title,
            component: <AdminLayout><EditReview title={title} reviewId={reviewId} /></AdminLayout>,
        };
    },

};
