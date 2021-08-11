import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminDashboard.css';

//Image
import UserImage from './user.jpg';
import TodayUser from './todayuser.jpg';
import Monthuser from './month.jpg';
import Listing from './totallisting.jpg';
import TodayList from './todaylist.jpg';
import Reserve from './reserve.jpg';
import Clock from './clock.jpg';

class AdminDashboard extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        user: PropTypes.shape({
            loading: PropTypes.bool,
            getUserDashboard: PropTypes.shape({
                totalCount: PropTypes.number.isRequired,
                todayCount: PropTypes.number.isRequired,
                monthCount: PropTypes.number.isRequired,
            })
        }),
        listing: PropTypes.shape({
            loading: PropTypes.bool,
            getListingDashboard: PropTypes.shape({
                totalCount: PropTypes.number.isRequired,
                todayCount: PropTypes.number.isRequired,
                monthCount: PropTypes.number.isRequired,
            })
        }),
    };

    static defaultProps = {
        user: {
            loading: true
        },
        listing: {
            loading: true
        },
        reservation: {
            loading: true
        }
    };

    render() {
        const { user, listing, reservation, user: { getUserDashboard }, listing: { getListingDashboard }, reservation: { getReservationDashboard }, title } = this.props;
        if (user.getUserDashboard && listing.getListingDashboard && reservation.getReservationDashboard) {
            return (
                <div className={cx(s.pagecontentWrapper)}>
                    <div className={s.contentBox}>
                        <h1 className={s.headerTitle}>{title}</h1>
                        <Row>
                            <Col xs={12} md={12} sm={12} lg={12}>
                                <div className={s.wrapper}>

                                    <Row>
                                        <Col sm={12} md={12} lg={12} className={s.nopad}>
                                            <Col sm={8} md={8} lg={8} className={s.nopad}>
                                                <Col sm={12} md={12} lg={12}>
                                                    <div className={cx(s.box, s.user)} style={{ backgroundImage: `url(${UserImage})` }} >
                                                        <div className={s.gridvalue}>
                                                            <h2>{"Total Users"}</h2>
                                                            {getUserDashboard.totalCount}
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={6} md={6} lg={6} className={s.paadR7}>
                                                    <div className={cx(s.box, s.todayuser)} style={{ backgroundImage: `url(${TodayUser})` }} >
                                                        <div className={s.gridvalue}>
                                                            <h2>{"Last 24 hours - Users"}</h2>
                                                            {getUserDashboard.todayCount}
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={6} md={6} lg={6} className={s.paadL8}>
                                                    <div className={cx(s.box, s.monthuser)} style={{ backgroundImage: `url(${Monthuser})` }} >
                                                        <div className={s.gridvalue}>
                                                            <h2>{"Last 30 days - Users"}</h2>
                                                            {getUserDashboard.monthCount}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Col>

                                            <Col sm={4} md={4} lg={4} className={s.paadL0}>
                                                <div className={cx(s.box, s.listing)} style={{ backgroundImage: `url(${Listing})` }} >
                                                    <div className={s.gridvalue}>
                                                        <h2>{"Total Listings"}</h2>
                                                        {getListingDashboard.totalCount}
                                                    </div>
                                                </div>
                                            </Col>
                                        </Col>
                                    </Row>



                                    <Row>
                                        <Col sm={6} md={6} lg={6} className={s.paadR7}>
                                            <div className={cx(s.box, s.todaylist)} style={{ backgroundImage: `url(${TodayList})` }} >
                                                <div className={s.gridvalue}>
                                                    <h2>{"Last 24 hours - Listings"}</h2>
                                                    {getListingDashboard.todayCount}
                                                </div>
                                            </div>
                                        </Col>

                                        <Col sm={6} md={6} lg={6} className={s.paadL8}>
                                            <div className={cx(s.box, s.monthlist)} style={{ backgroundImage: `url(${Listing})` }} >
                                                <div className={s.gridvalue}>
                                                    <h2>{"Last 30 days - Listings"}</h2>
                                                    {getListingDashboard.monthCount}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col sm={4} md={4} lg={4} className={s.paadR7}>
                                            <div className={cx(s.box, s.todaylist)} style={{ backgroundImage: `url(${Reserve})` }} >
                                                <div className={s.gridvalue}>
                                                    <h2>{"Total Reservations"}</h2>
                                                    {getReservationDashboard.totalCount}
                                                </div>
                                            </div>
                                        </Col>

                                        <Col sm={4} md={4} lg={4} className={cx(s.paadL8, s.paadR7)}>
                                            <div className={cx(s.box, s.daylist)} style={{ backgroundImage: `url(${Clock})` }} >
                                                <div className={s.gridvalue}>
                                                    <h2>{"Last 24 hours - Reservations"}</h2>
                                                    {getReservationDashboard.todayCount}
                                                </div>
                                            </div>
                                        </Col>

                                        <Col sm={4} md={4} lg={4} className={s.paadL8}>
                                            <div className={cx(s.box, s.resermoth)} style={{ backgroundImage: `url(${Listing})` }} >
                                                <div className={s.gridvalue}>
                                                    <h2>{"Last 30 days - Reservations"}</h2>
                                                    {getReservationDashboard.monthCount}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }

    }
}

export default withStyles(s)(AdminDashboard);
