import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Style
import {
    Button,
    Col,
    Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBar.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import Link from '../../Link';

import { validatePrivilege } from '../../../helpers/adminPrivileges';

class SideBar extends Component {

    static defaultProps = {
        isSuperAdmin: false,
        privileges: []
    };

    constructor(props) {
        super(props);
        this.state = {
            // step1: true,
            step1: false,
            step3: false,
            home: false,
            whyHost: false
        };
    }

    render() {
        const { isSuperAdmin, privileges } = this.props;
        const { step1, step3, home } = this.state;

        return (
            <div className={cx(s.sidebarWrapper, "hidden-print")}>
                <div className={cx(s.sideBarWelcome)}>
                    <span>Welcome, Admin</span>
                </div>
                <ul className={s.sidebarNav}>
                    <li>
                        <Link to={"/siteadmin/"}>
                            <FontAwesome.FaBarChart className={s.navigationIcon} />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {
                        validatePrivilege(1, privileges) && <li>
                            <Link to={"/siteadmin/settings/site"}>
                                <FontAwesome.FaCog className={s.navigationIcon} />
                                <span>Site Settings</span>
                            </Link>
                        </li>
                    }

                    {
                        isSuperAdmin && <li>
                            <Button
                                bsStyle="link"
                                className={cx(s.button, s.noPadding)}
                                onClick={() => this.setState({
                                    subAdmin: !this.state.subAdmin
                                })}>
                                <FontAwesome.FaStar className={s.navigationIcon} />
                                <span>Manage Admins</span>
                                {
                                    this.state.subAdmin && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                                }

                                {
                                    !this.state.subAdmin && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                                }

                            </Button>
                            <Collapse in={this.state.subAdmin} className={s.subMenu}>
                                <div>
                                    <Link to={"/siteadmin/admin-users"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Manage Admin Users</span>
                                    </Link>

                                    <Link to={"/siteadmin/admin-roles"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Manage Admin Roles</span>
                                    </Link>
                                </div>
                            </Collapse>
                        </li>
                    }

                    {
                        validatePrivilege(2, privileges) && <li>
                            <Link to={"/siteadmin/users"}>
                                <FontAwesome.FaUser className={s.navigationIcon} />
                                <span>Manage Users</span>
                            </Link>
                        </li>
                    }

                    {
                        validatePrivilege(3, privileges) && <li>
                            <Link to={"/siteadmin/listings"}>
                                <FontAwesome.FaList className={s.navigationIcon} />
                                <span>Manage Listings</span>
                            </Link>
                        </li>
                    }

                    {
                        validatePrivilege(4, privileges) && <li>
                            <Link to={"/siteadmin/reservations"}>
                                <FontAwesome.FaPlane className={s.navigationIcon} />
                                <span>Manage Reservations</span>
                            </Link>
                        </li>
                    }

                    {
                        validatePrivilege(5, privileges) && <li>
                            <Link to={"/siteadmin/user-reviews"}>
                                <FontAwesome.FaLineChart className={s.navigationIcon} />
                                <span>Reviews Management</span>
                            </Link>
                        </li>
                    }

                    {
                        validatePrivilege(6, privileges) && <li>
                            <Button
                                bsStyle="link"
                                className={cx(s.button, s.noPadding)}
                                onClick={() => this.setState({
                                    adminReview: !this.state.adminReview
                                })}>
                                <FontAwesome.FaStar className={s.navigationIcon} />
                                <span>Admin Reviews</span>
                                {
                                    this.state.adminReview && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                                }

                                {
                                    !this.state.adminReview && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                                }

                            </Button>
                            <Collapse in={this.state.adminReview} className={s.subMenu}>
                                <div>
                                    <Link to={"/siteadmin/reviews"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Manage Reviews</span>
                                    </Link>

                                    <Link to={"/siteadmin/write-reviews"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Write Review</span>
                                    </Link>
                                </div>
                            </Collapse>
                        </li>
                    }

                    {
                        validatePrivilege(7, privileges) && <li>
                            <Link to={"/siteadmin/settings/servicefees"}>
                                <FontAwesome.FaCreditCard className={s.navigationIcon} />
                                <span>Manage Service Fee</span>
                            </Link>
                        </li>
                    }

                    {
                        validatePrivilege(8, privileges) && <li>
                            <Link to={"/siteadmin/document"}>
                                <FontAwesome.FaFile className={s.navigationIcon} />
                                <span>Document Verification</span>
                            </Link>
                        </li>
                    }

                    {
                        validatePrivilege(9, privileges) && <li>
                            <Link to={"/siteadmin/messages"}>
                                <FontAwesome.FaInbox className={s.navigationIcon} />
                                <span>Messages</span>
                            </Link>
                        </li>
                    }
                    {
                        validatePrivilege(10, privileges) && <li>
                            <Link to={"/siteadmin/reportUser"}>
                                <FontAwesome.FaUserSecret className={s.navigationIcon} />
                                <span>Report Management</span>
                            </Link>
                        </li>
                    }

                    {
                        isSuperAdmin && <li>
                            <Link to={"/siteadmin/currency"}>
                                <FontAwesome.FaMoney className={s.navigationIcon} />
                                <span>Manage Currency</span>
                            </Link>
                        </li>
                    }

                    {
                        validatePrivilege(11, privileges) && <li>
                            <Link to={"/siteadmin/settings/search"}>
                                <FontAwesome.FaCogs className={s.navigationIcon} />
                                <span>Search Settings</span>
                            </Link>
                        </li>
                    }

                    <li>
                        <Link to={"/siteadmin/change/admin"}>
                            <FontAwesome.FaCogs className={s.navigationIcon} />
                            <span>Change Password</span>
                        </Link>
                    </li>

                    {
                        (validatePrivilege(12, privileges) || validatePrivilege(13, privileges)) && <li>
                            <Button
                                bsStyle="link"
                                className={cx(s.button, s.noPadding)}
                                onClick={() => this.setState({
                                    home: !this.state.home
                                })}>
                                <FontAwesome.FaHome className={s.navigationIcon} />
                                <span>Home Page Settings</span>
                                {
                                    this.state.home && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                                }

                                {
                                    !this.state.home && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                                }

                            </Button>
                            <Collapse in={this.state.home} className={s.subMenu}>
                                <div>
                                    {
                                        validatePrivilege(12, privileges) && <Link to={"/siteadmin/home/caption"}>
                                            <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                            <span>Banner Caption</span>
                                        </Link>
                                    }

                                    {
                                        validatePrivilege(12, privileges) && <Link to={"/siteadmin/home/banner"}>
                                            <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                            <span>Image Banner</span>
                                        </Link>
                                    }

                                    {
                                        validatePrivilege(12, privileges) && <Link to={"/siteadmin/home/footer-block"}>
                                            <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                            <span>Footer Block</span>
                                        </Link>
                                    }

                                    {
                                        validatePrivilege(13, privileges) && <Link to={"/siteadmin/popularlocation"}>
                                            <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                            <span>Manage Popular Locations</span>
                                        </Link>
                                    }

                                    {
                                        validatePrivilege(12, privileges) && <Link to={"/siteadmin/home/static-info-block"}>
                                            <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                            <span>Static Info Block</span>
                                        </Link>
                                    }
                                    {
                                        validatePrivilege(12, privileges) && <Link to={"/siteadmin/home/home-banner"}>
                                            <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                            <span>Home Banner</span>
                                        </Link>
                                    }
                                    {/* <Link to={"/siteadmin/blogmanagement"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Blog Management</span>
                                    </Link> */}
                                </div>
                            </Collapse>
                        </li>
                    }
                    {
                        validatePrivilege(16, privileges) && <li>
                        <Button
                            bsStyle="link"
                            className={cx(s.button, s.noPadding)}
                            onClick={() => this.setState({
                                whyHost: !this.state.whyHost
                            })}>
                            <FontAwesome.FaHome className={s.navigationIcon} />
                            <span>Why Become Host Page</span>
                            {
                                this.state.whyHost && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                            }

                            {
                                !this.state.whyHost && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                            }

                        </Button>
                        <Collapse in={this.state.whyHost} className={s.subMenu}>
                            <div>
                            <Link to={"/siteadmin/whyHost/Block1"}>
                                    <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                    <span>Block 1</span>
                                </Link>
                                <Link to={"/siteadmin/whyHost/Block2"}>
                                    <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                    <span>Block 2</span>
                                </Link>
                                <Link to={"/siteadmin/whyHost/Block3"}>
                                    <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                    <span>Block 3</span>
                                </Link>
                                <Link to={"/siteadmin/whyHost/Block4"}>
                                    <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                    <span>Block 4</span>
                                </Link>
                                <Link to={"/siteadmin/whyHost/Block5"}>
                                    <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                    <span>Block 5</span>
                                </Link>
                                <Link to={"/siteadmin/whyHost/Block6"}>
                                    <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                    <span>Block 6</span>
                                </Link>
                                <Link to={"/siteadmin/whyHost/Block7"}>
                                    <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                    <span>Block 7</span>
                                </Link>
                            </div>
                        </Collapse>
                    </li>
                    }

                    {
                        validatePrivilege(14, privileges) && <li>
                            <Button
                                bsStyle="link"
                                className={cx(s.button, s.noPadding)}
                                onClick={() => this.setState({
                                    step1: !this.state.step1
                                })}>
                                <FontAwesome.FaSliders className={s.navigationIcon} />
                                <span>List Settings for Step#1</span>
                                {
                                    this.state.step1 && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                                }

                                {
                                    !this.state.step1 && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                                }
                            </Button>
                            <Collapse in={this.state.step1} className={s.subMenu}>
                                <div>
                                    <Link to={"/siteadmin/listsettings/1"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Room Type</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/2"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Person Capacity</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/3"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>House Type</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/4"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Building Size</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/5"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Bed Rooms</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/6"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Beds</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/7"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Bed Type</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/8"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Bathrooms</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/9"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Bathroom Type</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/10"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Essential Amenities</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/11"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Safety Amenities</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/12"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Spaces</span>
                                    </Link>
                                </div>
                            </Collapse>
                        </li>
                    }

                    {
                        validatePrivilege(14, privileges) && <li>
                            <Button
                                bsStyle="link"
                                className={cx(s.button, s.noPadding)}
                                onClick={() => this.setState({
                                    step3: !this.state.step3
                                })}>
                                <FontAwesome.FaSliders className={s.navigationIcon} />
                                <span>List Settings for Step#3</span>
                                {
                                    this.state.step3 && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                                }

                                {
                                    !this.state.step3 && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                                }
                            </Button>
                            <Collapse in={this.state.step3} className={s.subMenu}>
                                <div>
                                    <Link to={"/siteadmin/listsettings/13"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Guest Requirements</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/14"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>House Rules</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/15"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Review How Guests Book</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/16"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Booking Notice Time</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/18"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Minimum Nights</span>
                                    </Link>
                                    <Link to={"/siteadmin/listsettings/19"}>
                                        <FontAwesome.FaCircleThin className={s.navigationIcon} />
                                        <span>Maximum Nights</span>
                                    </Link>
                                </div>
                            </Collapse>
                        </li>
                    }
                    {
                        validatePrivilege(15, privileges) && <li>
                            <Link to={"/siteadmin/content-management"}>
                                <FontAwesome.FaList className={s.navigationIcon} />
                                <span>Content Management</span>
                            </Link>
                        </li>
                    }
                    {
                        validatePrivilege(15, privileges) && <li>
                            <Link to={"/siteadmin/staticpage/management"}>
                                <FontAwesome.FaList className={s.navigationIcon} />
                                <span>Static Content Management</span>
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        )
    }
}

const mapState = (state) => ({
    isSuperAdmin: state.runtime.isSuperAdmin,
    privileges: state.adminPrevileges.privileges && state.adminPrevileges.privileges.privileges
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SideBar));
