import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewReservation.css';

// Query
import viewReservationAdmin from './viewReservationAdmin.graphql';

// Component
import ViewReservation from '../../../components/siteadmin/ViewReservation';
import Loader from '../../../components/Loader';

class ViewReservationroute extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllReservationAdmin: PropTypes.array,
        })
    };

    render() {
        const { data: { loading } } = this.props;
        if (loading) {
            return <Loader type={"text"} />;
        }

        const { data: { viewReservationAdmin ,refetch}, title } = this.props;
        return <ViewReservation data={viewReservationAdmin}
            title={title}
            refetch={refetch}
        />;
    }

}

export default compose(
    withStyles(s),
    graphql(viewReservationAdmin,
        {
            options:(props)=> ({
                variables: {
                    id:props.id,
                },
                fetchPolicy: 'network-only',
                ssr: false
            })
        }),
)(ViewReservationroute);
