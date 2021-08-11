import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import cx from 'classnames';
import { Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifiedInfo.css';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
class NoItem extends Component {

    static propTypes = {
        isLoggedInUser: PropTypes.bool.isRequired,
        formatMessage: PropTypes.any,
    };

    render() {
        const { isLoggedInUser } = this.props;
        return (
            <ul className={cx(s.listStyle, s.space3)}>
                <li className={s.space2}>
                    <Col md={12} className={s.colMiddle}>
                        <span><FormattedMessage {...messages.noVerifications} /></span>
                    </Col>
                </li>

                {
                    isLoggedInUser && <li className={s.space2}>
                        <Col md={12} className={s.colMiddle}>
                            <span>
                                <Link to={"/user/verification"}>
                                    <FormattedMessage {...messages.addVerifications} />
                                </Link>
                            </span>
                        </Col>
                    </li>
                }
            </ul>
        );
    }
}

export default withStyles(s)(NoItem);