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

class Flexible extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName } = this.props;
    return (
      <div>
        <div >
          <h3><FormattedMessage {...messages.flexibleTitle} /></h3>
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
            <li>
              {siteName}{' '}<FormattedMessage {...messages.cancelDetailsEight} />
            </li>
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
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.refund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  1{' '}<FormattedMessage {...messages.dayPrior} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.months} />{' '}<FormattedMessage {...messages.flexibleThirdMonthsNumberOne} />
                  <br />
                  <FormattedMessage {...messages.flexibleThirdMonthsTimeOne} />{' '}<FormattedMessage {...messages.flexibleTime} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.flexibleTwelve} />
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.timeLine, s.semiRefund)}>
              <div className={s.timeLinePoint}>
                <Tooltip placement="top" id="tooltip-top" className={s.toolTop}>
                  <FormattedMessage {...messages.checkIn} />
                </Tooltip>
                <div className={s.toolMarker}></div>
                <div className={s.toolLable}>
                  <FormattedMessage {...messages.flexibleSecondMonths} />{' '}<FormattedMessage {...messages.flexibleThirdMonthsNumberTwo} /><br />
                  <FormattedMessage {...messages.flexibleThirdMonthsTimeOne} />{' '}<FormattedMessage {...messages.flexibleTime} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.flexibleThirteen} />
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
                  <FormattedMessage {...messages.flexibleThirdMonths} />{' '}<FormattedMessage {...messages.flexibleThirdMonthsNumberThree} /><br />
                  <FormattedMessage {...messages.flexibleThirdMonthsTimeTwo} />{' '}<FormattedMessage {...messages.flexibleSecondTime} />
                </div>
              </div>
              <div className={s.FlexibleTop}>
                <p>
                  <FormattedMessage {...messages.flexibleFourteen} />
                </p>
              </div>
            </Col>
            <div className={s.toolText}>
              <FormattedMessage {...messages.example} />
            </div>
          </Row>
          <div className="clearBoth"></div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Flexible);
