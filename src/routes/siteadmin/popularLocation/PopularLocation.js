import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocation.css';

// Component
import PopularLocationManagement from '../../../components/siteadmin/PopularLocation/PopularLocationManagement';

// Query
import getPopularLocation from './getPopularLocation.graphql';

class PopularLocation extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getPopularLocation: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading }, title } = this.props;

        const { data: { getPopularLocation } } = this.props;
        return (
            <PopularLocationManagement 
                data={getPopularLocation}
                title={title}
            />  
        );
    }
}

export default compose(
    withStyles(s),
    graphql(getPopularLocation,
    {
        options: {
            fetchPolicy: 'network-only',
            ssr: false
        }
    }),
)(PopularLocation);