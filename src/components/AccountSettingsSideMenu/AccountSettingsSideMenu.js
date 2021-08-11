import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccountSettingsSideMenu.css';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
class AccountSettingsSideMenu extends React.Component {
    render() {
        return (
            <div>
                <ul className={s.listContainer}>
                    <li>
                        <Link to={"/user/payout"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.payoutPreferences} />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/user/transaction"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.transactionHistory} />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/users/security"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.security} />
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withStyles(s)(AccountSettingsSideMenu);