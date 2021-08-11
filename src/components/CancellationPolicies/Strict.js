import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Row,
  Col,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancellationPolicies.css';

// Locale
import messages from '../../locale/messages';
class Strict extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName } = this.props;
    return (
      <div className={s.strictPadding}>
        <div >
          <h3><FormattedMessage {...messages.strictTitle} /></h3>
          <ul className={s.subText}>
            <li>
              <FormattedMessage {...messages.cancelDetailsOne} />
            </li>
            <li>
              <FormattedMessage {...messages.cancelDetailsTwo} />{' '}
              {siteName}{' '}
              <FormattedMessage {...messages.cancelDetailsThree} />{' '}
              {siteName}{' '}
              <FormattedMessage {...messages.cancelDetailsFour} />
            </li>
            <li>
              <FormattedMessage {...messages.cancelDetailsFive} />
            </li>
            <li>
              <FormattedMessage {...messages.cancelDetailsSix} />{' '}
              {siteName}{' '}
              <FormattedMessage {...messages.cancelDetailsSeven} />
            </li>
            <li>{siteName}{' '}<FormattedMessage {...messages.cancelDetailsEight} /></li>
            <li>
              <FormattedMessage {...messages.cancelDetailsNine} />
            </li>
            <li>
              <FormattedMessage {...messages.cancelDetailsTen} />{' '}
              {siteName}{' '}
              <FormattedMessage {...messages.cancelDetailsTwelve} />
            </li>
            <li>
              <FormattedMessage {...messages.cancelDetailsEleven} />
            </li>
          </ul>
        </div>
        <div className={cx(s.lineGraph, s.hidesm)}>
          <Row className={s.graphContainer}>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.semiRefund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  7{' '}<FormattedMessage {...messages.daysPrior} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.months} />{' '}08 <br />
                  <FormattedMessage {...messages.flexibleThirdMonthsTimeOne} />{' '}<FormattedMessage {...messages.flexibleTime} />
                </div>

              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.strictOne} />
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.nonRefund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.checkIn} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.flexibleSecondMonths} />{' '}<FormattedMessage {...messages.strictMonthsOne} /> <br />
                  <FormattedMessage {...messages.flexibleThirdMonthsTimeOne} />{' '}<FormattedMessage {...messages.flexibleTime} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.strictTwo} />
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.nonRefund)} >
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.checkOut} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.flexibleThirdMonths} />{' '}<FormattedMessage {...messages.strictMonthsTwo} /> <br />
                  <FormattedMessage {...messages.flexibleThirdMonthsTimeTwo} />{' '}<FormattedMessage {...messages.flexibleSecondTime} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.strictThree} />
                </p>
              </div>
            </Col>
            <div className={s.toolText}>
              <FormattedMessage {...messages.example} />
            </div>
          </Row>
        </div>

      </div>
    );
  }
}
export default withStyles(s)(Strict);