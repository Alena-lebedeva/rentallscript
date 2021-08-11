import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddBlogDetails.css';

// Component
import AddBlogDetailsPage from '../../../components/siteadmin/AddBlogDetails/AddBlogDetails';
class AddBlogDetails extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getBlogParentPage: PropTypes.any,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading }, title } = this.props;

        return (
            <AddBlogDetailsPage
                title={title}
            />
        );
    }
}

export default compose(
    withStyles(s),
)(AddBlogDetails);