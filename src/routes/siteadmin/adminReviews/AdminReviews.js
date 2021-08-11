import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviews.css';
import Loader from '../../../components/Loader';

// Component
import AdminReviewsManagement from '../../../components/siteadmin/AdminReviewsManagement/AdminReviewsManagement';

// Query
import adminReviewsQuery from './adminReviewsQuery.graphql';

class AdminReviews extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAdminReviews: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {

        const { reviewsManagement: { loading, reviewsManagement }, title } = this.props;

        if (loading) {
            return <Loader type={"text"} />;
        } else {
            return (
                <AdminReviewsManagement
                    reviewsManagement={reviewsManagement}
                    title={title}
                />
            );
        }
    }
}

export default compose(
    withStyles(s),
    graphql(adminReviewsQuery, {
        name: 'reviewsManagement',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(AdminReviews);