import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DayPickerRangeController, isInclusivelyAfterDay } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';

import {
  Col,
} from 'react-bootstrap';
import cx from 'classnames';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AvailabilityCalendar.css';
import S from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

// Redux
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Redux Actions
import { checkAvailability } from '../../../actions/checkAvailability';
import { getBlockedDates } from '../../../actions/Listing/getBlockedDates';
import { getSpecialPricingData } from '../../../actions/Listing/getSpecialPricingData';

import CustomizableCalendarDay from './CustomizableCalendarDay';
import CustomDayContents from './CustomDayContents';

class AvailabilityCalendar extends React.Component {
  static propTypes = {
    listId: PropTypes.number.isRequired,
    blockedDates: PropTypes.array,
    smallDevice: PropTypes.bool,
    verySmallDevice: PropTypes.bool
  };

  static defaultProps = {
    blockedDates: [],
    listId: null,
    maxDaysNotice: 'unavailable',
    autoFocusEndDate: false,
    showInputs: false,
    keepOpenOnDateSelect: false,
    initialVisibleMonth: null,
    hideKeyboardShortcutsPanel: true,
    noBorder: true,
    startDateOffset: undefined,
    endDateOffset: undefined,
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 1,
    smallDevice: false,
    verySmallDevice: false,
    formName: 'BookingForm',
    formStartDate: null,
    formEndDate: null
  }

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: null,
      endDate: null,
      blockedDatesSet: new Set(),
      currentDate: moment().format('YYYY-MM-DD'),
      smallDevice: false
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
    this.onNextMonthChange = this.onNextMonthChange.bind(this);
    this.onPrevMonthChange = this.onPrevMonthChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    const { blockedDates } = this.props;
    const { smallDevice } = this.state;
    const blockedDatesSet = new Set();

    let windowHeight = isBrowser ? window.matchMedia('(max-width: 640px)').matches : undefined;
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);

    }
    blockedDates.forEach(day => {
      // we save the unique timestamp of that day
      blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
    });

    this.setState({ blockedDatesSet });
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { blockedDates, formStartDate, formEndDate } = nextProps;
    const { blockedDatesSet } = this.state;
    blockedDates.forEach(day => {
      // we save the unique timestamp of that day
      blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
    });

    this.setState({ blockedDatesSet });

    if (formStartDate && formEndDate) {
      this.setState({
        startDate: moment(formStartDate),
        endDate: moment(formEndDate)
      });
    }


  }

  async onDatesChange({ startDate, endDate }) {
    const { listId, formName, checkAvailability, change, maximumNights, getSpecialPricingData } = this.props;
    const { listingData: { minNight, maxNight, maxDaysNotice } } = this.props;
    const { focusedInput } = this.state;

    this.setState({ startDate, endDate });
    await change(formName, 'startDate', startDate);
    await change(formName, 'endDate', endDate);
    if ((focusedInput === END_DATE || focusedInput === START_DATE) && endDate) {
      await getSpecialPricingData(listId, startDate, endDate);
      await checkAvailability(listId, startDate, endDate, maxNight);
    }
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  isDayBlocked(day) {
    const { blockedDatesSet } = this.state;
    if (blockedDatesSet) {
      return blockedDatesSet.has(moment(day).format('YYYY-MM-DD'));
    } else {
      return null;
    }
  }


  async onNextMonthChange(e) {
    const { getBlockedDates, listId } = this.props;
    const { blockedDatesSet } = this.state;
    let today = moment().format('YYYY-MM-DD');
    let navigationDate = moment(e).format('YYYY-MM-DD');
    let monthsDiff = moment(navigationDate).diff(moment(today), 'months');
    //const blockedDatesSet = new Set();
    if (monthsDiff && monthsDiff > 0) {
      let isRangedMonth = Number(monthsDiff) % 5;
      if (isRangedMonth === 0) {
        const { data } = await getBlockedDates(listId, moment(navigationDate).startOf('month').format('YYYY-MM-DD'));
        if (data && data.getBlockedDatesCalendar && data.getBlockedDatesCalendar.length > 0) {
          data.getBlockedDatesCalendar.forEach(day => {
            blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
          });
          this.setState({ blockedDatesSet });
        }
      }
    }
  }

  async onPrevMonthChange(e) {
    const { getBlockedDates, listId } = this.props;
    const { blockedDatesSet } = this.state;
    let today = moment().format('YYYY-MM-DD');
    let navigationDate = moment(e).format('YYYY-MM-DD');
    let monthsDiff = moment(navigationDate).diff(moment(today), 'months');
    //const blockedDatesSet = new Set();
    let filterDate = moment(e).add(-5, 'months');

    if (monthsDiff && monthsDiff > 0) {
      let isRangedMonth = Number(monthsDiff) % 4;
      if (isRangedMonth === 0) {
        const { data } = await getBlockedDates(listId, moment(filterDate).startOf('month').format('YYYY-MM-DD'));
        if (data && data.getBlockedDatesCalendar && data.getBlockedDatesCalendar.length > 0) {
          data.getBlockedDatesCalendar.forEach(day => {
            blockedDatesSet.add(moment(day.blockedDates).format('YYYY-MM-DD'));
          });
          this.setState({ blockedDatesSet });
        }
      }
    }

  }

  handleResize(e) {
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : false;
    this.setState({ smallDevice });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const { verySmallDevice, listId } = this.props;
    const { smallDevice } = this.state;
    const { listingData } = this.props;
    const { loading, blockedDates } = this.props;

    const { formatMessage } = this.props.intl;
    let numberOfMonths = (smallDevice) ? 1 : 2;
    let today = moment(), condition;
    let breakPoint;
    let minNight = listingData && listingData.minNight;
    let maxNight = listingData && listingData.maxNight;
    let maxDaysNotice = listingData && listingData.maxDaysNotice;
    let bookingNoticeTime = listingData && listingData.bookingNoticeTime;



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
      } else if (maxDaysNotice == 'available') {
        condition = day => !isInclusivelyAfterDay(day, today)
      }
    }

    return (
      <div className={cx(s.pageContent)}>
        {
          !loading && <Col xs={12} sm={12} md={12} lg={12} className={cx(s.sectionContainer, s.boxContainer, s.listOneLeft, s.noPadddingLeftRight)}>
            <h1 className={cx(s.titleText, s.space2)}>
              <FormattedMessage {...messages.availability} />
            </h1>
            {
              minNight != null && minNight > 0 &&
              <p><span className={cx(s.text)}> <strong>{minNight} {minNight > 1 ? 'nights' : 'night'}{' '}</strong>
                <FormattedMessage {...messages.minimumStay} />
              </span>
              </p>
            }
            <div className={cx(s.calendarContainer, 'availabilityCalendar')}>

              <DayPickerRangeController
                {...this.props}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
                onDatesChange={this.onDatesChange}
                onFocusChange={this.onFocusChange}
                numberOfMonths={numberOfMonths}
                isOutsideRange={condition}
                daySize={40}
                minimumNights={minNight > 0 ? minNight : 1}
                onOutsideClick={() => { console.log('outside click') }}
                renderCalendarDay={props => <CustomizableCalendarDay {...props} />}
                // renderDayContents={day => <CustomDayContents day={day} startDate={startDate} endDate={endDate} minimumNights={minNight > 0 ? minNight : 1} />}
                isDayBlocked={day => this.isDayBlocked(day)}
                onPrevMonthClick={(props) => { this.onPrevMonthChange(props) }}
                onNextMonthClick={(props) => { this.onNextMonthChange(props) }}
              />
            </div>
          </Col>
        }
      </div>
    );
  }
}

const selector = formValueSelector('BookingForm');

const mapState = state => ({
  formStartDate: selector(state, 'startDate'),
  formEndDate: selector(state, 'endDate')
});

const mapDispatch = {
  change,
  checkAvailability,
  getBlockedDates,
  getSpecialPricingData
};

export default injectIntl(withStyles(s, S)(connect(mapState, mapDispatch)(AvailabilityCalendar)));
