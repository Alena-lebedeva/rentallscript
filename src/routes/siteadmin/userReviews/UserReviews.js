import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserReviews.css';

// Component
import UserReviewsManagement from '../../../components/siteadmin/UserReviewsManagement/UserReviewsManagement';

// Query
import userReviewsQuery from './userReviewsQuery.graphql';

class UserReviews extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getReviewsDetails: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading }, title } = this.props;

        const { data: { getReviewsDetails, refetch } } = this.props;

        return (
            <UserReviewsManagement
                data={getReviewsDetails}
                title={title}
                refetch={refetch}
            />
        );
    }
}

export default compose(
    withStyles(s),
    graphql(userReviewsQuery,
        {
            options: {
                fetchPolicy: 'network-only',
                ssr: false
            }
        }),
)(UserReviews);