import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditReview.css';

// Component
import AdminReviewsForm from '../../../components/siteadmin/AdminReviewsForm';

// Query
import editAdminReviewsQuery from './editAdminReview.graphql';

class EditReview extends React.Component {

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
        const { data: { loading, editAdminReview }, title, reviewId } = this.props;
        if (loading) {
            return (
                <div> Loading... </div>
            );
        } else {
            return (
                <AdminReviewsForm title={title} initialValues={editAdminReview} />
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
)(EditReview);