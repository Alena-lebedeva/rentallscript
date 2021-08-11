import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Transaction.css';

// Components
import NoTransaction from '../NoTransaction';
import FutureTransactionItem from './FutureTransactionItem';

// Locale
import messages from '../../../locale/messages';

class FutureTransactions extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.shape({
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      payoutId: PropTypes.number,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired
      }),
      guestData: PropTypes.shape({
        firstName: PropTypes.string.isRequired
      })
    }))
  };

  static defaultProps = {
    data: []
  };

  render() {
    const { data } = this.props;
    return (
      <div className={cx("table-responsive", s.noBorder)}>
        <table className={cx('table', s.noBorder)}>
          <thead>
            <tr className={s.rowBorder}>
              <th className={cx(s.labelText, s.noBorder)}><FormattedMessage {...messages.transferDate} /></th>
              <th className={cx(s.labelText, s.noBorder)}><FormattedMessage {...messages.transferType} /></th>
              <th className={cx(s.labelText, s.noBorder)}><FormattedMessage {...messages.details} /></th>
              <th className={cx(s.labelText, s.noBorder)}><FormattedMessage {...messages.payTo} /> </th>
              <th className={cx(s.labelText, s.noBorder)}><FormattedMessage {...messages.transferAmount} /></th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 && data.map((item, index) => {
                return <FutureTransactionItem
                  key={index}
                  className={s.labelText}
                  data={item}
                />
              })
            }
          </tbody>
        </table>
        {
          data.length === 0 && <NoTransaction />
        }
      </div>
    );
  }
}

export default withStyles(s)(FutureTransactions);
