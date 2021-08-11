import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import AccountItem from './AccountItem';
import NoItem from './NoItem';
import Link from '../Link';

// Style
import cx from 'classnames';
import {
    Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifiedInfo.css';

// Locale
import messages from '../../locale/messages';

class Accounts extends Component {

    static propTypes = {
       items: PropTypes.shape({
           isEmailConfirmed: PropTypes.bool.isRequired,
           isFacebookConnected: PropTypes.bool.isRequired,
           isGoogleConnected: PropTypes.bool.isRequired,
           isIdVerification: PropTypes.bool.isRequired,
       }),
       isLoggedInUser: PropTypes.bool.isRequired,
       formatMessage: PropTypes.any,
    };

    static defaultProps = {
        items: {
            isEmailConfirmed: false,
            isFacebookConnected: false,
            isGoogleConnected: false,
            isIdVerification: false
        }
    }

    render () {
        const { items, isLoggedInUser } = this.props;
        const { formatMessage } = this.props.intl;

        if(items !== null){
            let count = 0;
            count = items.isEmailConfirmed ? count + 1 : count;
            count = items.isFacebookConnected ? count + 1 : count;
            count = items.isGoogleConnected ? count + 1 : count;
            count = items.isIdVerification ? count + 1 : count;
            return (
                <ul className={cx(s.listStyle, s.space3)}>
                    {
                        items.isEmailConfirmed && <AccountItem itemName={formatMessage(messages.emailConfirmed)} />
                    }
                    {
                        items.isFacebookConnected && <AccountItem itemName={formatMessage(messages.fbConnected)} /> 
                    }
                    {
                        items.isGoogleConnected && <AccountItem itemName={formatMessage(messages.googleConnected)} /> 
                    }
                    {
                        items.isIdVerification && <AccountItem itemName={formatMessage(messages.documentverified)} /> 
                    }                    
                    {
                        !items.isEmailConfirmed && !items.isFacebookConnected && !items.isGoogleConnected && <NoItem isLoggedInUser={isLoggedInUser} />
                    }
                    {
                        isLoggedInUser && count > 0 && count < 4 &&  <li className={s.space2}>
                            <Col md={12} className={s.colMiddle}>
                                <span>
                                    <Link to={"/user/verification"}>
                                        <FormattedMessage {...messages.moreVerifications} />
                                    </Link>
                                </span>
                            </Col>
                        </li>
                    }
                </ul>
            );
        
        } else {
            return <NoItem isLoggedInUser={isLoggedInUser} />
        }
    }
}

export default injectIntl(withStyles(s)(Accounts));