import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';
import { change } from 'redux-form';

// External Component
import DayPicker, { DateUtils } from 'react-day-picker';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./DayCalendar.css';

class DayCalendar extends Component {

  static propTypes = {
    change: PropTypes.any,
    formName: PropTypes.string,
    disabledDates: PropTypes.array,
    blockedDates: PropTypes.array,
  };

  static defaultProps = {
    disabledDates: [],
    blockedDates: []
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
    };
    this.isDaySelected = this.isDaySelected.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  componentWillMount() {
    const { blockedDates } = this.props;
    if (blockedDates != undefined) {
      this.setState({ selectedDays: blockedDates });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { blockedDates } = nextProps;
    if (blockedDates != undefined) {
      this.setState({ selectedDays: blockedDates });
    }
  }

  isDaySelected(day) {
    const { selectedDays } = this.state;
    if (selectedDays.length > 0) {
      return selectedDays.some(selectedDay =>
        DateUtils.isSameDay(selectedDay, day),
      );
    }
  }
  async handleDayClick(day, { disabled, selected }) {
    if (disabled) {
      return;
    }
    const { blockedDates } = this.props;
    let selectedDays = blockedDates.slice();
    const { change, formName } = this.props;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day),
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
    await change(formName, "blockedDates", selectedDays);
  }

  render() {
    const { selectedDays } = this.state;
    const { disabledDates } = this.props;
    let dateObj = new Date();

    return (
      <div>
        <DayPicker
          selectedDays={this.isDaySelected}
          onDayClick={this.handleDayClick}
          disabledDays={[DateUtils.isPastDay, ...disabledDates]}
          fromMonth={dateObj}
          toMonth={DateUtils.addMonths(dateObj, 11)}
        />
      </div>
    );
  }

}

const mapState = (state) => ({});

const mapDispatch = {
  change
};

export default withStyles(s)(connect(mapState, mapDispatch)(DayCalendar));

