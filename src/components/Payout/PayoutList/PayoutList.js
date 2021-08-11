import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import {
  Button,
  Panel,
  Label,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import * as FaInfoCircle from 'react-icons/lib/fa/info-circle';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';

// Redirection
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

// Redux actions
import { removePayout } from '../../../actions/Payout/removePayoutAction';
import { setDefaultPayout } from '../../../actions/Payout/setDefaultPayout';
import { verifyPayout } from '../../../actions/Payout/verifyPayout';

class PayoutList extends Component {

  static defaultProps = {
    payoutRemoveLoader: false,
    payoutDefaultLoader: false,
    payoutVerifyLoader: false,
    data: []
  };

  handleClick() {
    history.push('/user/addpayout');
  }

  render() {
    const { data, removePayout, setDefaultPayout, currentAccountId, verifyPayout } = this.props;
    const { formatMessage } = this.props.intl;
    const { payoutRemoveLoader, payoutDefaultLoader, payoutVerifyLoader } = this.props;

    return (
      <Panel className={s.panelHeader} header={formatMessage(messages.payoutMethod)} >
        <div className={s.panelBody}>
          <p className={s.payoutIntro}>
            <FormattedMessage {...messages.payoutTitleBlock1} />
          </p>
          <table className={cx('table', s.noBorder)}>
            <thead>
              <tr className={cx(s.rowBorder, s.sectionTitleLight, s.textTruncate)}>
                <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle} /></th>
                <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle4} /></th>
                <th className={s.noBorder}><FormattedMessage {...messages.status} /></th>
                <th className={s.noBorder}><FormattedMessage {...messages.options} /></th>
              </tr>
            </thead>
            <tbody>
              {
                data.length > 0 && data.map((item, index) => {
                  return (
                    <tr className={cx(s.rowBorder, s.sectionTitleLight)} key={index}>
                      <td>{item.paymentMethod.name} {item.default && <Label bsStyle="success"><FormattedMessage {...messages.default} /></Label>}</td>
                      <td>
                        {
                          item.methodId == 1 && <span>
                            {item.payEmail}
                          </span>
                        }
                        {
                          item.methodId == 2 && <span>
                            ******{item.last4Digits}
                          </span>
                        }
                        ({item.currency})
                          </td>
                      <td>
                        {
                          item.isVerified === true && <FormattedMessage {...messages.ready} />
                        }
                        {
                          item.isVerified !== true && <FormattedMessage {...messages.notReady} />
                        }
                      </td>
                      <td className={s.textTruncate}>
                        {
                          !item.default && item.isVerified === true && <a
                            href="javascript:void(0)"
                            className={cx({ [s.transparentText]: payoutDefaultLoader })}
                            onClick={() => {
                              if (!payoutDefaultLoader) {
                                setDefaultPayout(item.id)
                              }
                            }}
                          >
                            <FormattedMessage {...messages.setDefault} />
                          </a>
                        }
                        {
                          !item.default && item.isVerified !== true && <a
                            href="javascript:void(0)"
                            onClick={() => {
                              if (!payoutVerifyLoader) {
                                verifyPayout(item.payEmail);
                              }
                            }}
                          >
                            <FormattedMessage {...messages.payoutVerify} /> 
                            <OverlayTrigger
                              overlay={<Tooltip id={'tooltip' + index}><FormattedMessage {...messages.payoutVerifyStripeInfo} /></Tooltip>}
                              placement="top"
                            >
                              <span>&nbsp;<FaInfoCircle style={{color: '#484848'}} /></span>
                            </OverlayTrigger>
                          </a>
                        }
                        {
                          !item.default && <a
                            className={cx(s.textSpace, { [s.transparentText]: payoutRemoveLoader })}
                            href="javascript:void(0)"
                            onClick={() => {
                              if (!payoutRemoveLoader) {
                                removePayout(item.id);
                              }
                            }}
                          >
                            <FormattedMessage {...messages.remove} />
                          </a>
                        }

                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <div className={cx(s.sectionTitleLight)}>
            <Button className={cx(s.button, s.btnlarge, s.btnPrimary)} onClick={this.handleClick}>
              <FormattedMessage {...messages.addPayout} />
            </Button>
            <span className={s.textMuted}>&nbsp;<FormattedMessage {...messages.directDeposit} /></span>
          </div>
        </div>
      </Panel>

    );
  }
}

const mapState = (state) => ({
  payoutRemoveLoader: state.loader.payoutRemove,
  payoutDefaultLoader: state.loader.payoutDefault,
  payoutVerifyLoader: state.loader.payoutVerify
});

const mapDispatch = {
  removePayout,
  setDefaultPayout,
  verifyPayout
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PayoutList)));