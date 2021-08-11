import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationBeforeLogin.css';

import { Nav } from 'react-bootstrap';

// Modals
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import ForgotPassword from '../ForgotPassword';
import HeaderModal from '../HeaderModal';

import NavLink from '../NavLink';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../locale/messages';

import { openHeaderModal } from '../../actions/modalActions';

import { showCurrencySymbol } from '../../helpers/currencyConvertion';
import { formatLocale } from '../../helpers/formatLocale';


class NavigationBeforeLogin extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    openLoginModal: PropTypes.any,
    openSignupModal: PropTypes.any,
  };

  render() {
    const { className, openLoginModal, openSignupModal, openHeaderModal } = this.props;
    const { toCurrency, baseCurrency, currentLocale,  openClose } = this.props;
    let displayCurrency = toCurrency ? toCurrency : baseCurrency;

    

    return (
      <div>
        <LoginModal />
        <SignupModal />
        <ForgotPassword />
        <HeaderModal modalType={'languageModal'} />
        <HeaderModal modalType={'currencyModal'} />
        <Nav pullRight>
        {/* <Nav pullRight className={s.newMenu}></Nav> */}
          <NavLink to="/" className={cx("hidden-lg", s.newMenuDesign)}>
            <FormattedMessage {...messages.home} />
          </NavLink>
          <NavLink
            noLink
            onClick={(e) => openHeaderModal('languageModal')}
            className={cx(s.breakPointScreen)}
          >
            {formatLocale(currentLocale)}
          </NavLink>
          <NavLink
            noLink
            onClick={(e) => openHeaderModal('currencyModal')}
            className={cx(s.breakPointScreen)}
          >
            {showCurrencySymbol(displayCurrency, currentLocale) + displayCurrency}
          </NavLink>
          <NavLink to="/whyhost">
            <FormattedMessage {...messages.becomeAHost} />
          </NavLink>
          <NavLink to="/help">
            <FormattedMessage {...messages.help} />
          </NavLink>
          <NavLink to="#" noLink onClick={openLoginModal}>
            <FormattedMessage {...messages.login} />
          </NavLink>
          <NavLink to="#" noLink onClick={openSignupModal}>
            <FormattedMessage {...messages.signup} />
          </NavLink>
        </Nav>
      </div>
    );
  }
}

const mapState = state => ({
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale
});
const mapDispatch = {
  openHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(NavigationBeforeLogin));
