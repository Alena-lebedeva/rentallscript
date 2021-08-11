import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import CurrencyConverter from '../CurrencyConverter'

// External Component
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import {
  Row,
  Col
} from 'react-bootstrap';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./DayDragCalendar.css';

import SaveCalendar from './SaveCalendar';
class DayDragCalendar extends Component {

  static propTypes = {
    change: PropTypes.func,
    formName: PropTypes.string,
    disabledDates: PropTypes.array,
    blockedDates: PropTypes.array,
  };

  static defaultProps = {
    disabledDates: [],
    blockedDates: [],
    listId: null,
    sources: []
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      from: undefined,
      to: undefined,
      dateRange: [],
      //availableDates: [],
      chooseRangeDate: [],
      isPrice: [],
      sources: []
    };
    this.isDaySelected = this.isDaySelected.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.resetCalendar = this.resetCalendar.bind(this);
    this.renderDay = this.renderDay.bind(this);
    this.resetDatePickerChange = this.resetDatePickerChange.bind(this);
  }

  componentWillMount() {
    const { blockedDates, sources, availableDatesPrices } = this.props;
    if (blockedDates != undefined) {
      this.setState({ selectedDays: blockedDates });
    }

    let sourcesValue = [];
    let sourceObject = {};

    availableDatesPrices && availableDatesPrices.map((item, key) => {
      sourceObject = {};
      sourceObject["isSpecialPrice"] = item.isSpecialPrice;
      sourceObject["blockedDates"] = item.date;
      sourcesValue.push(sourceObject);
    });
    this.setState({ sources: sourcesValue });
  }

  componentWillReceiveProps(nextProps) {
    const { blockedDates, sources, availableDatesPrices } = nextProps;
    if (blockedDates != undefined) {
      this.setState({ selectedDays: blockedDates });
    }
    let sourcesValue = [];
    let sourceObject = {};

    availableDatesPrices && availableDatesPrices.map((item, key) => {
      sourceObject = {};
      sourceObject["isSpecialPrice"] = item.isSpecialPrice;
      sourceObject["blockedDates"] = item.date;
      sourcesValue.push(sourceObject);
    });
    this.setState({ sources: sourcesValue });

  }

  renderDay(day) {
    const { currency, baseCurrency, isAdminCurrency } = this.props;
    const { dateRange, sources } = this.state;
    const date = day.getDate();
    let dateRangeValue = moment(day).format('YYYY-MM-DD');

    return (
      <div className={s.responsiveDisplay}>
        <span className={'dateFontWeight'}>{date}</span>
        <div>
          {
            sources && sources.map((item, key) => {
              let dateValue = moment(item.blockedDates).format('YYYY-MM-DD');
              if (dateRangeValue == dateValue) {
                return (
                  <div className={'priceAlignment'}>
                    <CurrencyConverter
                      amount={item.isSpecialPrice}
                      from={currency}
                    />
                    {/* {item.isSpecialPrice} */}
                  </div>
                );
              }
            })
          }
        </div>
      </div >
    );
  }


  isDaySelected(day) {
    const { selectedDays } = this.state;

    if (selectedDays.length > 0) {
      return selectedDays.some(selectedDay =>
        DateUtils.isSameDay(selectedDay, day),
      );
    }
  }

  async handleDayClick(day, { start, end, selected, disabled }) {
    const { blockedDates, change, formName } = this.props;
    let selectedDays = blockedDates.slice();
    let startDate, endDate;
    let dateRange = [], rangeStart, rangeEnd;

    if (disabled) {
      return;
    }

    const range = DateUtils.addDayToRange(day, this.state);
    startDate = range.from;
    endDate = range.to;

    if (startDate && !endDate) {
      rangeStart = new Date(startDate);
      dateRange.push(rangeStart);
    } else if (startDate && endDate) {
      rangeStart = new Date(startDate);
      rangeEnd = new Date(endDate);

      if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
        dateRange.push(rangeStart);

        rangeStart = new Date(+rangeStart);

        while (rangeStart < endDate) {

          dateRange.push(rangeStart);
          var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
          rangeStart = new Date(newDate);
        }
      } else {
        startDate = null;
        endDate = null;
        dateRange, selectedDays = [];
      }
    }
    this.setState({ selectedDays, dateRange, from: startDate, to: endDate });

    change('ListPlaceStep3', 'startDate', startDate)
    change('ListPlaceStep3', 'endDate', endDate)
  }

  resetCalendar() {
    const { change } = this.props;
    // this.setState({ dateRange: [], from: null, to: null, startDate: null, endDate: null });
    this.setState({ dateRange: [], from: null, to: null, startDate: null, endDate: null });
    change('ListPlaceStep3', 'startDate', null)
    change('ListPlaceStep3', 'endDate', null)
  }

  resetDatePickerChange() {
    const { change } = this.props;
    this.setState({ dateRange: [], from: null, to: null });
  }

  render() {
    const { selectedDays, from, to, dateRange } = this.state;
    const { disabledDates, formName, listId, availableDates } = this.props;
    const { availableDatesPrices } = this.props;
    const { sources } = this.state;
    const { minNight, maxNight, houseRules, checkInEnd, checkInStart } = this.props;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime } = this.props;
    const { cleaningPrice, basePrice, currency } = this.props;
    const { isStartDate, isEndDate } = this.props;

    let dateObj = new Date();

    const modifiers = {
      start: from,
      end: to,
      selected: selectedDays,
      selecting: dateRange,
      available: availableDates
    };

    return (
      <Row>
        <Col lg={8} md={10} sm={10} xs={12} className={'saveCalender'}>

          <DayPicker
            selectedDays={[this.isDaySelected, from, { from, to }]}
            onDayClick={this.handleDayClick}
            modifiers={modifiers}
            disabledDays={[DateUtils.isPastDay, ...disabledDates]}
            fromMonth={dateObj}
            renderDay={this.renderDay}
            localeUtils={MomentLocaleUtils}
            todayButton="Today"
            className={'BecomeCalendar'}
          />
        </Col>
        <Col lg={4} md={4} sm={6} xs={12}>

          <SaveCalendar
            selectedDays={dateRange}
            start={from}
            end={to}
            formName={formName}
            resetCalendar={this.resetCalendar}
            resetDatePickerChange={this.resetDatePickerChange}
            listId={listId}
            minNight={minNight}
            maxNight={maxNight}
            houseRules={houseRules}
            checkInEnd={checkInEnd}
            checkInStart={checkInStart}
            cancellationPolicy={cancellationPolicy}
            maxDaysNotice={maxDaysNotice}
            bookingNoticeTime={bookingNoticeTime}
            cleaningPrice={cleaningPrice}
            basePrice={basePrice}
            currency={currency}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
          />
        </Col>
      </Row>
    );
  }

}


const selector = formValueSelector('ListPlaceStep3');

const mapState = (state) => ({
  isStartDate: selector(state, 'startDate'),
  isEndDate: selector(state, 'endDate'),
});

const mapDispatch = {
  change
};

export default withStyles(s)(connect(mapState, mapDispatch)(DayDragCalendar));

