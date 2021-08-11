import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux Action
import { change, formValueSelector } from 'redux-form';

import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';
class DateRange extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null,
            isCurrentStatus: 2,
            from: undefined,
            to: undefined,
            dateRange: [],
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    componentDidMount() {
        const { defaultStartDate, defaultEndDate, isCurrentStatus } = this.props;

        this.setState({
            isCurrentStatus: isCurrentStatus
        })

        if (defaultStartDate) {
            this.setState({
                startDate: moment(moment(defaultStartDate)),
            });
        }

        if (defaultEndDate) {
            this.setState({
                endDate: moment(moment(defaultEndDate)),
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { defaultStartDate, defaultEndDate, isCurrentStatus } = nextProps;
        this.setState({
            isCurrentStatus: isCurrentStatus
        })
        if (defaultStartDate) {
            this.setState({
                startDate: moment(moment(defaultStartDate)),
            });
        }

        if (defaultEndDate) {
            this.setState({
                endDate: moment(moment(defaultEndDate)),
            });
        }
    }


    async onDatesChange({ startDate, endDate }) {
        const { formName, change, startDateName, endDateName, resetCalendar } = this.props;
        const { isCurrentStatus } = this.state;
        const { onChange } = this.props;
        this.setState({ startDate, endDate });
        change(formName, 'startDate', startDate);
        change(formName, 'endDate', endDate);
        await resetCalendar();
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }


    render() {
        const { focusedInput, startDate, endDate, isCurrentStatus } = this.state;

        return (
            <div>
                <DateRangePicker
                    {...this.props}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                    numberOfMonths={1}
                    startDatePlaceholderText={"Start Date"}
                    endDatePlaceholderText={"End Date"}
                    hideKeyboardShortcutsPanel
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    readOnly
                />
            </div>
        );
    }
}

const selector = formValueSelector('ListPlaceStep3');

const mapState = (state) => ({
    defaultStartDate: selector(state, 'startDate'),
    defaultEndDate: selector(state, 'endDate'),
});

const mapDispatch = {
    change
};

export default withStyles(s)(connect(mapState, mapDispatch)(DateRange));

