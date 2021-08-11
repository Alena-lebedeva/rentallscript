// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies'
import { injectIntl } from 'react-intl';

// Bootstrap
import {
  Button,
  Grid
} from 'react-bootstrap';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CookiesDisclaimer.css';

// Locale
import messages from '../../locale/messages';
import { url, sitename } from '../../config';
class CookiesDisclaimer extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isCookiesSet: false,
      isPageLoad: false,
    }
    this.disclamierForm = this.disclamierForm.bind(this);
  }

  componentWillMount() {
    let cookiesValue = cookie.load('cookiesDisclaimer');
    this.setState({
      isCookiesSet: (cookiesValue) ? true : false
    });
  }

  componentDidMount() {
    let cookiesValue = cookie.load('cookiesDisclaimer');
    this.setState({
      isCookiesSet: (cookiesValue) ? true : false,
      isPageLoad: true
    });
  }

  disclamierForm() {
    let maxAge = 3650 * 24 * 365;
    cookie.save('cookiesDisclaimer', 'RentallDisclaimer', {
      path: '/',
      maxAge
    })
    this.setState({ isCookiesSet: true })
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { isCookiesSet, isPageLoad } = this.state;
    if (isCookiesSet) {
      return <span />;
    } else {
      return (
        <Grid fluid>
          {
            isPageLoad && <div
              className={cx(s.root, s.container, s.fixedPosition)}
            >
              <div className={cx(s.cookiesBackground)}>
                <div>
                  <div className={cx(s.displayTable, s.displayTableSection)}>
                    <div className={s.displayRow}>
                      <div className={s.displayText}>
                        <span className={cx(s.labelText)}>
                          {sitename}{' '}
                          {formatMessage(messages.cookiesDisclaimer)}
                          {' '}
                          <a
                            href={url + '/policies/'}
                            className={cx(s.labelText, s.linkStyle)}
                          >
                            {formatMessage(messages.cookiePolicy)}
                          </a>
                        </span>
                      </div>

                      <div className={cx(s.displayBtn)}>
                        <Button
                          type="button"
                          className={cx(s.button, s.btnlarge)}
                          onClick={this.disclamierForm}
                        >
                          {formatMessage(messages.gotIt)}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          }
        </Grid>
      )
    }
  }
}

export default injectIntl(withStyles(s)(CookiesDisclaimer));


