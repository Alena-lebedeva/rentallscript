import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditPopularLocation.css';

// Component
import EditPopularLocationManagement from '../../../components/siteadmin/EditPopularLocation/EditPopularLocationManagement';

// Query
import editPopularLocationQuery from './editPopularLocationQuery.graphql';

class EditPopularLocation extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
        }),
        locationId: PropTypes.number.isRequired
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading, editPopularLocation }, title } = this.props;
        return (
            <EditPopularLocationManagement
                title={title} initialValues={editPopularLocation}
            />
        );
    }
}

export default compose(
    withStyles(s),
    graphql(editPopularLocationQuery,
        {
            options: (props) => ({
                variables: {
                    id: props.locationId,
                },
                fetchPolicy: 'network-only'
            })
        })
)(EditPopularLocation);