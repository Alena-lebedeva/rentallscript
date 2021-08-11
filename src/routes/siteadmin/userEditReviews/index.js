import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import UserEditReviews from './UserEditReviews';

const title = 'Management Reviews';

export default {

    path: '/siteadmin/management-reviews/:reviewId',

    async action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        const reviewId = Number(params.reviewId);

        return {
            title,
            component: <AdminLayout><UserEditReviews title={title} reviewId={reviewId} /></AdminLayout>,
        };
    },

};
