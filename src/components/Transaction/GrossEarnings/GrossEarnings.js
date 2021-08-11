import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Transaction.css';

// Components
import NoTransaction from '../NoTransaction';
import GrossEarningItem from './GrossEarningItem';

// Locale
import messages from '../../../locale/messages';

class GrossEarnings extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.shape({
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired
      }),
      guestData: PropTypes.shape({
        firstName: PropTypes.string.isRequired
      }),
      hostTransaction: PropTypes.shape({
        payoutId: PropTypes.number,
        payEmail: PropTypes.string,
        amount: PropTypes.number,
        currency: PropTypes.string,
        createdAt: PropTypes.string
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
              <th className={cx(s.labelText, s.noBorder)}><FormattedMessage {...messages.grossEarnings} /> </th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 && data.map((item, index) => {
                return <GrossEarningItem
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

export default withStyles(s)(GrossEarnings);
