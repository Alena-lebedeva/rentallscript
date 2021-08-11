import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

//Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenuTrips.css';

import {
    Col
} from 'react-bootstrap';

// Locale
import messages from '../../../locale/messages';

// Component
import Link from '../../Link';
import history from '../../../core/history';

class SideMenuTrips extends React.Component {
    handleClick() {
        history.push('/become-a-host');
    }

    render() {
        return (
            <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
                <ul className={s.listContainer}>
                    <li>
                        <Link to={'/trips/current'} className={s.sideNavitem}>
                            <FormattedMessage {...messages.upcomingTrips} />
                        </Link>
                    </li>
                    <li>
                        <Link to={'/trips/previous'} className={s.sideNavitem}>
                            <FormattedMessage {...messages.previousTrips} />
                        </Link>
                    </li>
                </ul>
            </Col>
        );
    }
}

export default withStyles(s)(SideMenuTrips);