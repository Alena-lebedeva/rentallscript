import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticPage.css';

// Component
import StaticPageManagement from '../../../components/siteadmin/StaticPageManagement/StaticPageManagement';


class StaticPage extends React.Component {

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
            <StaticPageManagement 
                title={title}
            />  
        );
    }
}

export default compose(
    withStyles(s),
)(StaticPage);