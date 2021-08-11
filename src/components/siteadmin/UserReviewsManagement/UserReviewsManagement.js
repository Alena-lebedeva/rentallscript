import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';

import Link from '../../../components/Link';

import {
    updateReviewStatus
} from '../../../actions/siteadmin/UserReview/manageReviews';

import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserReviewsManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

import { censorEmail, censorPhone } from '../../../helpers/secureEmail';

import StarRating from '../../StarRating';

class UserReviewsManagement extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        editUser: PropTypes.func,
        title: PropTypes.string.isRequired,
        updateReviewStatus: PropTypes.func.isRequired,
    };

    render() {
        const { data, editUser, title } = this.props;
        const { updateReviewStatus } = this.props;
        return (
            <div className={cx(s.pagecontentWrapper)}>
                <div className={s.contentBox}>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={'table-responsive'}>
                        <Table className="table"
                            filterable={['List ID', 'Review Content', 'Review Rating']}
                            noDataText="No matching records found."
                            sortable={true}
                            defaultSort={{ column: 'Updated Date', direction: 'desc' }}
                            itemsPerPage={20}
                        >
                            {
                                data && data.map(function (value, key) {
                                    let content = value.reviewContent;
                                    let reviewContent = content.slice(0, 10);
                                    let dots = '...'
                                    let isContent = false;
                                    if (content.length > 10) {
                                        isContent = true;
                                    } else {
                                        isContent = false;
                                    }
                                    let hostName = value.userData && value.userData.firstName;
                                    let guestName = value.authorData && value.authorData.firstName;
                                    let hostProfileId = value.userData && value.userData.profileId;
                                    let guestProfileId = value.authorData && value.authorData.profileId;
                                    let title = value.listData && value.listData.title ? value.listData.title : 'List is missing';
                                    let confirmationCode = value.singleReservationData && value.singleReservationData.confirmationCode ? value.singleReservationData.confirmationCode : '';
                                    let checkInDate = value.singleReservationData && value.singleReservationData.checkIn ? moment(value.singleReservationData.checkIn).format('DD-MM-YYYY') : '';
                                    let checkOutDate = value.singleReservationData && value.singleReservationData.checkOut ? moment(value.singleReservationData.checkOut).format('DD-MM-YYYY') : '';


                                    return (
                                        <Tr key={key}>
                                            <Td column={"List ID"} data={value.listId} />
                                            {
                                                isContent && <Td column={"Review Content"}>
                                                    {reviewContent.concat(dots)}
                                                </Td>
                                            }
                                            {
                                                title && <Td column={"List Title"}>
                                                    <a
                                                        href={"/rooms/" + value.listId}
                                                        target="_blank"
                                                    >
                                                        {title}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                confirmationCode && <Td column={"Reservation Confirmation Code"}>
                                                    {confirmationCode}
                                                </Td>
                                            }
                                            {
                                                checkInDate && <Td column={"Check-in Date"}>
                                                    {checkInDate}
                                                </Td>
                                            }
                                            {
                                                checkOutDate && <Td column={"Check-out Date"}>
                                                    {checkOutDate}
                                                </Td>
                                            }
                                            {
                                                !isContent && <Td column={"Review Content"}>
                                                    {reviewContent}
                                                </Td>
                                            }

                                            {
                                                guestName && <Td column={"Sender"}>
                                                    <a
                                                        href={"/users/show/" + guestProfileId}
                                                        target="_blank"
                                                    >
                                                        {guestName}
                                                    </a>
                                                    {/* <Link to={"/users/show/" + guestProfileId}>
                                                        {guestName}
                                                    </Link> */}
                                                </Td>
                                            }

                                            {
                                                hostName && <Td column={"Receiver"}>
                                                    <a
                                                        href={"/users/show/" + hostProfileId}
                                                        target="_blank"
                                                    >
                                                        {hostName}
                                                    </a>
                                                    {/* <Link to={"/users/show/" + hostProfileId}>
                                                        {hostName}
                                                    </Link> */}
                                                </Td>
                                            }

                                            <Td column={"Review Rating"}>
                                                <StarRating
                                                    className={s.reviewStar}
                                                    value={value.rating}
                                                    name={'review'}
                                                />
                                            </Td>

                                            {
                                                !value.isAdminEnable && <Td column="Review Status">
                                                    Disabled
                                                </Td>
                                            }

                                            {
                                                value.isAdminEnable && <Td column="Review Status">

                                                    Enabled
                                                </Td>
                                            }

                                            {
                                                !value.isAdminEnable && <Td column="Review Action">
                                                    <a
                                                        href="javascript:void(0)"
                                                        onClick={() => updateReviewStatus(value.id, 'enable')}
                                                    >
                                                        Set to enable
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.isAdminEnable && <Td column="Review Action">
                                                    <a
                                                        href="javascript:void(0)"
                                                        onClick={() => updateReviewStatus(value.id, 'disable')}
                                                    >

                                                        Set to disable
                                                    </a>
                                                </Td>
                                            }


                                            <Td column="Action">
                                                <Link to={"/siteadmin/management-reviews/" + value.id}>
                                                    Edit
                                                </Link>
                                            </Td>

                                        </Tr>
                                    )
                                })
                            }
                        </Table>
                    </div>
                </div>
            </div>
        );
    }

}

const mapState = (state) => ({
});

const mapDispatch = {
    updateReviewStatus
};

export default withStyles(s)(connect(mapState, mapDispatch)(UserReviewsManagement));

