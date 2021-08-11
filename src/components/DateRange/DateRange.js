import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Redux Action
import { change } from 'redux-form';

import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/css/styles.scss';

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
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }


    onDatesChange({ startDate, endDate }) {
        const { formName, change } = this.props;
        const { onChange } = this.props;
        this.setState({ startDate, endDate });
        if (startDate != null && endDate != null) {
            onChange(`'${moment(startDate).format("YYYY-MM-DD")}' AND '${moment(endDate).format("YYYY-MM-DD")}'`);
        }
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }


    render() {
        const { focusedInput, startDate, endDate } = this.state;

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
                    startDatePlaceholderText={"Check In"}
                    endDatePlaceholderText={"Check Out"}
                    hideKeyboardShortcutsPanel
                />
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    change
};

export default withStyles(s)(connect(mapState, mapDispatch)(DateRange));

