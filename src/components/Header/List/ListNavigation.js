import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Nav,
  NavItem
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListNavigation.css';

import SaveButton from './SaveButton';

// Locale
import messages from '../../../locale/messages';
class ListNavigation extends React.Component {

  static propTypes = {
    step: PropTypes.number.isRequired,
    formPage: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  render() {
    const { step, formPage } = this.props;
    let stepLabel;
    if (step === 1) {
      stepLabel = <FormattedMessage {...messages.step1SubHeading} />
    } else if (step === 2) {
      stepLabel = <FormattedMessage {...messages.step2SubHeading} />
    } else if (step === 3) {
      stepLabel = <FormattedMessage {...messages.step3SubHeading} />
    }

    return (
      <div>
        <Nav pullLeft>
          <NavItem eventKey={1} className={s.hideSm}>
            <span><FormattedMessage {...messages.headerText} /> {step}:</span>
            <span> {stepLabel}</span>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <SaveButton
            step={step}
            formPage={formPage}
            className={s.exitText}
          />
        </Nav>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListNavigation));
