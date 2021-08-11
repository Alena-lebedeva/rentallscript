import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import history from '../../../core/history'
import { setUserLogout } from '../../../actions/logout'
import { connect } from 'react-redux';

//Component
import AdminDashboard from '../../../components/siteadmin/AdminDashboard';
import Loader from '../../../components/Loader';

// GraphQL
import UserDashboard from './UserDashboard.graphql';
import ListingDashboard from './ListingDashboard.graphql';
import ReservationDashboard from './ReservationDashboard.graphql';
import GetAdminUser from './GetAdminUser.graphql'

class Dashboard extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        getUserData: PropTypes.object,
        ListingDashboard: PropTypes.object,
    };

    componentDidMount() {
        const { getAdminUser, setUserLogout } = this.props
        if (getAdminUser.getAdminUser === null) {
            setUserLogout()
        }
    }

    render() {
        const { getUserData, getListingData, getReservationData, getAdminUser, title } = this.props;

        if (getUserData.loading || getListingData.loading || getReservationData.loading) {
            return <Loader type={"text"} />;
        } else if (getAdminUser.getAdminUser === null) {
            return (
                <div>
                    <Loader type={"text"} />
                </div>
            )
        }

        
        return <AdminDashboard
            title={title}
            user={getUserData}
            listing={getListingData}
            reservation={getReservationData}
        />;
        
    }
}
const mapState = state => ({})

const mapDispatch = {
    setUserLogout
}

export default compose(
    graphql(UserDashboard,
        {
            name: 'getUserData',
            options: {
                fetchPolicy: 'network-only'
            }
        }
    ),
    graphql(ListingDashboard,
        {
            name: 'getListingData',
            options: {
                fetchPolicy: 'network-only'
            }
        }
    ),
    graphql(ReservationDashboard,
        {
            name: 'getReservationData',
            options: {
                fetchPolicy: 'network-only'
            }
        }
    ),
    graphql(GetAdminUser,
        {
            name: 'getAdminUser',
            options: {
                fetchPolicy: 'network-only'
            }
        }
    ),
    (connect(mapState, mapDispatch))
)(Dashboard);