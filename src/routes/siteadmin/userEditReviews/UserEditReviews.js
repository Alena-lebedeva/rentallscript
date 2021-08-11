import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserEditReviews.css';

// Component
import UserReviewsForm from '../../../components/siteadmin/UserReviewsForm';

// Query
import editAdminReviewsQuery from './editUserReview.graphql';

class UserEditReviews extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        reviewId: PropTypes.number.isRequired
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading, editUserReviews }, title, reviewId } = this.props;
        if (loading) {
            return (
                <div> Loading... </div>
            );
        } else {
            return (
                <UserReviewsForm title={title} initialValues={editUserReviews} />
            );
        }
    }
}

export default compose(
    withStyles(s),
    graphql(editAdminReviewsQuery,
        {
            options: (props) => ({
                variables: {
                    reviewId: props.reviewId,
                },
                fetchPolicy: 'network-only'
            })
        }
    )
)(UserEditReviews);