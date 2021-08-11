import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BlogManagement.css';

// Component
import BlogManagement from '../../../components/siteadmin/Blog/BlogManagement';

// Query
import getBlogDetails from './getBlogDetails.graphql';

class BlogManagements extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getBlogDetails: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading }, title } = this.props;

        const { data: { getBlogDetails } } = this.props;
        return (
            <BlogManagement
                data={getBlogDetails}
                title={title}
            />
        );
    }
}

export default compose(
    withStyles(s),
    graphql(getBlogDetails,
        {
            options: {
                fetchPolicy: 'network-only',
                ssr: false
            }
        }),
)(BlogManagements);