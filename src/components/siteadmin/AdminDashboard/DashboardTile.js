import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminDashboard.css';

class DashboardTitle extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    };
    render() {
        const { label, value, icon, color } = this.props;
        return (
            <Col xs={12} sm={6} md={4} lg={4}>
                <div className={cx(s.infoBox)}>
                    <div className={cx(s.infoBoxIcon, color)}>
                        {icon}
                    </div>
                    <div className={cx(s.infoBoxContent)}>
                        <p>{label}</p>
                        <h3>{value}</h3>
                    </div>
                </div>
            </Col>
        )
    }
}

export default withStyles(s)(DashboardTitle);
