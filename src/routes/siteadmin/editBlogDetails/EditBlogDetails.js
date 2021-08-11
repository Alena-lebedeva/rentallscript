import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditBlogDetails.css';

// Component
import EditBlogDetailsManagement from '../../../components/siteadmin/EditBlogDetails/EditBlogDetails';

// Query
import editBlogDetails from './editBlogDetails.graphql';


class EditBlogDetails extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        blogId: PropTypes.number.isRequired,
        editBlogDetailsData: PropTypes.shape({
            loading: PropTypes.bool,
            editBlogDetailsData: PropTypes.object
        }),
    };


    render() {
        const { getBlogParentPageData, editBlogDetailsData, title } = this.props;
        return (
            <EditBlogDetailsManagement
                title={title} initialValues={editBlogDetailsData.editBlogDetails}
            />
        );
    }
}

export default compose(
    withStyles(s),
    graphql(editBlogDetails, {
        name: 'editBlogDetailsData',
        options: (props) => ({
            variables: {
                id: props.blogId,
            },
            fetchPolicy: 'network-only'
        })
    }),
)(EditBlogDetails);