import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';

// Redux
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// Redux Action
import { change } from 'redux-form';
import { checkAvailability } from '../../../actions/checkAvailability';

import { getSpecialPricingData } from '../../../actions/Listing/getSpecialPricingData';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';


class DateRange extends React.Component {
  static propTypes = {
    minimumNights: PropTypes.number.isRequired,
    maximumNights: PropTypes.number.isRequired,
    checkAvailability: PropTypes.any.isRequired,
    blockedDates: PropTypes.array.isRequired,
    listId: PropTypes.number.isRequired,
    formName: PropTypes.string.isRequired,
    maxDaysNotice: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    blockedDates: [],
    maxDaysNotice: 'unavailable'
  }

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      blockedDates: [],
      blockedDatesValues: []
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
  }
  componentDidMount() {
    const { bookingStartDate, bookingEndDate, blockedDates } = this.props;
    const { formName } = this.props;
    const blockedDatesSet = new Set();

    if (formName == 'BookingForm') {
      if (bookingStartDate && bookingEndDate) {
        this.setState({
          startDate: moment(bookingStartDate),
          endDate: moment(bookingEndDate)
        });
      }
    }

    blockedDates.forEach(day => {
      if (day.calendarStatus != 'available') {
        blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
      }
    });

    this.setState({ blockedDatesSet });
    this.setState({ blockedDatesValues: blockedDates });
  }

  componentWillReceiveProps(nextProps) {
    const { bookingStartDate, bookingEndDate, blockedDates } = nextProps;
    const { formName } = nextProps;
    const { blockedDatesSet } = this.state;

    if (formName == 'BookingForm') {
      if (bookingStartDate && bookingEndDate) {
        this.setState({
          startDate: moment(bookingStartDate),
          endDate: moment(bookingEndDate)
        });
      }
    }

    blockedDates.forEach(day => {
      if (day.calendarStatus != 'available') {
        blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
      }
    });

    this.setState({ blockedDatesSet });
    this.setState({ blockedDatesValues: blockedDates });
  }

  async onDatesChange({ startDate, endDate }) {
    //const { focusedInput } = this.state;
    const { focusedInput, blockedDatesSet, blockedDatesValues } = this.state;
    const { listId, formName, checkAvailability, change, maximumNights } = this.props;
    const { getSpecialPricingData } = this.props;

    this.setState({ startDate, endDate });
    await change(formName, 'startDate', startDate);
    await change(formName, 'endDate', endDate);
    if ((focusedInput === END_DATE || focusedInput === START_DATE) && endDate) {
      await getSpecialPricingData(listId, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
      await checkAvailability(listId, moment(moment(startDate)).format('YYYY-MM-DD'), moment(moment(endDate)).format('YYYY-MM-DD'), maximumNights);
    }
  }

  onFocusChange(focusedInput) {
    const { startDate } = this.state;
    this.setState({ focusedInput });
    if (focusedInput === START_DATE) {
      // this.setState({ endDate: null });
    }
  }

  isDayBlocked(day) {
    const { blockedDatesSet } = this.state;
    if (blockedDatesSet) {
      return blockedDatesSet.has(moment(day).format('YYYY-MM-DD'));
    } else {
      return null;
    }
  }


  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const { minimumNights, maximumNights, blockedDates, maxDaysNotice } = this.props;
    const { formatMessage } = this.props.intl;
    let condition, maximumEndDate;
    const today = moment();
    let breakPoint;
    if (maxDaysNotice === 'unavailable') {
      condition = day =>
        !isInclusivelyAfterDay(day, today) ||
        isInclusivelyAfterDay(day, today)
    } else {
      if (maxDaysNotice === '3months') {
        breakPoint = moment().add(3, 'months');
      } else if (maxDaysNotice === '6months') {
        breakPoint = moment().add(6, 'months');
      } else if (maxDaysNotice === '9months') {
        breakPoint = moment().add(9, 'months');
      } else if (maxDaysNotice === '12months') {
        breakPoint = moment().add(12, 'months');
      }
      if (maxDaysNotice !== 'available') {
        condition = day =>
          !isInclusivelyAfterDay(day, today) ||
          isInclusivelyAfterDay(day, breakPoint)
      }

    }

    return (
      <div>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          numberOfMonths={1}
          startDatePlaceholderText={formatMessage(messages.checkIn)}
          endDatePlaceholderText={formatMessage(messages.checkOut)}
          startDateId={'It is Start date id'}
          endDateId={'It is Start date id'}
          minimumNights={minimumNights > 0 ? minimumNights : 1}
          isDayBlocked={day => this.isDayBlocked(day)}
          isOutsideRange={condition}
          hideKeyboardShortcutsPanel
          readOnly
        />
      </div>
    );
  }
}

const bookingFormSelector = formValueSelector('BookingForm');

const mapState = state => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  bookingStartDate: bookingFormSelector(state, 'startDate'),
  bookingEndDate: bookingFormSelector(state, 'endDate')
});

const mapDispatch = {
  checkAvailability,
  change,
  getSpecialPricingData
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));
