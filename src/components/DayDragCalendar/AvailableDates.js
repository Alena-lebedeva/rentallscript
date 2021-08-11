import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';
import { change } from 'redux-form';

// Compose
import { graphql, gql, compose } from 'react-apollo';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Toastr
import { toastr } from 'react-redux-toastr';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// External Component
import { DateUtils } from 'react-day-picker';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    Form
} from 'react-bootstrap';

// Loader
import Loader from '../Loader';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./DayDragCalendar.css';
import c from './SaveCalendar.css';
import { getListBlockedDates } from '../../actions/Listing/getListBlockedDates';
import { getListingDataStep3 } from '../../actions/getListingDataStep3';
import { manageListingSteps } from '../../actions/manageListingSteps';

// Locale
import messages from '../../locale/messages';

class AvailableDates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateRange: [],
            isLoading: false
        };
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        const { start, end } = this.props;;
        let dateRange = [], rangeStart, rangeEnd;
        if (start && !end) {
            rangeStart = new Date(start);
            dateRange.push(rangeStart);
        } else if (start && end) {
            rangeStart = new Date(start);
            rangeEnd = new Date(end);
            if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
                dateRange.push(rangeStart);
                rangeStart = new Date(+rangeStart);
                while (rangeStart < end) {
                    dateRange.push(rangeStart);
                    var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
                    rangeStart = new Date(newDate);
                }
            }
        }
        this.setState({ dateRange });
    }


    componentWillReceiveProps(nextProps) {
        const { start, end } = nextProps;
        let dateRange = [], rangeStart, rangeEnd;

        if (start && !end) {
            rangeStart = new Date(start);
            dateRange.push(rangeStart);
        } else if (start && end) {
            rangeStart = new Date(start);
            rangeEnd = new Date(end);

            if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
                dateRange.push(rangeStart);

                rangeStart = new Date(+rangeStart);

                while (rangeStart < end) {

                    dateRange.push(rangeStart);
                    var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
                    rangeStart = new Date(newDate);
                }
            }
        }
        this.setState({ dateRange });
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                    {...input}
                    placeholder={label}
                    type={type}
                    className={className}
                    maxLength={5}
                //maxLength={3}
                />
            </div>
        )
    }

    async submitForm() {
        
        const { listId, resetCalendar, dispatch, mutate } = this.props;
        const { isSpecialPrice, start, end, selectedDays, getListBlockedDates, getListingDataStep3 } = this.props;
        const { dateRange, isLoading } = this.state;
        const { formatMessage } = this.props.intl;
        const { minNight, maxNight, houseRules, checkInEnd, checkInStart } = this.props;
        const { cancellationPolicy, maxDaysNotice, bookingNoticeTime, manageListingSteps } = this.props;
        const { basePrice, cleaningPrice, currency, isStartDate, isEndDate } = this.props;
        const { removeBlockedDates, updateBlockedDates } = this.props;

        let minNightValues = minNight != '' ? minNight : 0;
        let maxNightValues = maxNight != '' ? maxNight : 0;
        let checkInEndValue = checkInEnd != '' ? checkInEnd : 'flexible';
        let checkInStartValue = checkInStart != '' ? checkInStart : 'flexible';
        let isCancel = cancellationPolicy ? cancellationPolicy : '1';
        let isMaxDays = maxDaysNotice ? maxDaysNotice : 'unavailable';
        let isBooking = bookingNoticeTime ? bookingNoticeTime : 58;

        let convertStart = start ? moment(start).format('ddd, Do MMM') : null;
        let convertEnd = end ? moment(end).format('ddd, Do MMM') : null;


        let dateRangeNew = [], rangeStart, rangeEnd;

        if (isStartDate && !isEndDate) {
            rangeStart = new Date(isStartDate);
            dateRangeNew.push(rangeStart);
        } else if (isStartDate && isEndDate) {
            rangeStart = new Date(isStartDate);
            rangeEnd = new Date(isEndDate);

            if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
                dateRangeNew.push(rangeStart);

                rangeStart = new Date(+rangeStart);

                while (rangeStart < isEndDate) {

                    dateRangeNew.push(rangeStart);
                    var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
                    rangeStart = new Date(newDate);
                }
            }
        }

        if (isSpecialPrice && (isNaN(isSpecialPrice) || (parseFloat(isSpecialPrice, 10) < 1))) {
            toastr.error('Special Price', 'Special price is invalid');
            return;
        }

        let successMsg = formatMessage(messages.selectedDatesSuccess);
        let errorMsg = formatMessage(messages.selectedDatesError);

        let updatedAvailableDatesDays = dateRange;

        if (dateRangeNew && dateRangeNew.length > 0) {

            dateRangeNew.forEach(async (item, index) => {
                let selectedIndex = updatedAvailableDatesDays.findIndex(selectedDay =>
                    DateUtils.isSameDay(selectedDay, item)
                );

                if (selectedIndex < 0) {
                    updatedAvailableDatesDays.push(item);
                }
            });

            let updatedStatus = 400;

            if (isSpecialPrice && isSpecialPrice > 0) {
                this.setState({ isLoading: true });
                const { data } = await updateBlockedDates({
                    // updateBlockedDates,
                    variables: {
                        listId,
                        blockedDates: updatedAvailableDatesDays,
                        calendarStatus: 'available',
                        isSpecialPrice: isSpecialPrice
                    }
                });

                this.setState({ isLoading: false });
                if (data && data.UpdateBlockedDates && data.UpdateBlockedDates.status == '200') {
                    updatedStatus = 200;
                }
            } else {
                this.setState({ isLoading: true });
                const { data } = await removeBlockedDates({
                    variables: {
                        listId,
                        blockedDates: updatedAvailableDatesDays,
                    }
                });
                if (data && data.RemoveBlockedDates && data.RemoveBlockedDates.status == '200') {
                    this.setState({ isLoading: false });
                    updatedStatus = 200;
                } else {
                    this.setState({ isLoading: false });
                    updatedStatus = 400;
                    errorMsg = formatMessage(messages.removeDateError);
                }
            }

            // if (updatedStatus == '200') {
            await change("blockedDates", updatedAvailableDatesDays);
            await getListingDataStep3(listId);
            await getListBlockedDates(
                listId,
                minNightValues,
                maxNightValues,
                checkInEndValue,
                checkInStartValue,
                houseRules,
                isCancel,
                isMaxDays,
                isBooking,
                basePrice,
                cleaningPrice,
                currency
            );
            await getListingDataStep3(listId);
            await manageListingSteps(listId, 3);
            await resetCalendar();
            window.scroll({ top: 0 });
            // toastr.success("Success!", successMsg);
            // } 
            // else {
            //     // toastr.error("Error!", errorMsg);
            // }
        }
    }


    render() {
        const { listId, start, end } = this.props;
        const { error, handleSubmit, pristine, submitting, dispatch, dateRange, isStartDate } = this.props;
        const { initialValues } = this.props;
        const { formatMessage } = this.props.intl;
        const { isLoading } = this.state;
        let convertStart = start ? moment(start).format('ddd, Do MMM') : null;
        let convertEnd = end ? moment(end).format('ddd, Do MMM') : null;
        const phoneParser = (number) => number ? number.replace(/[^\d\.]/g, '') : '';

        return (
            <div>
                {
                    (start || isStartDate) && <span>

                        <Form onSubmit={handleSubmit(this.submitForm)}>
                            {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                            <FormGroup className={cx(s.formGroup)}>
                                <ControlLabel className={cx(s.landingLabel, c.marginBottom)}>
                                    <FormattedMessage {...messages.sessionPrice} />
                                </ControlLabel>
                                <Field
                                    name="isSpecialPrice"
                                    type="text"
                                    component={this.renderFormControl}
                                    label={formatMessage(messages.basePriceLabel)}
                                    className={cx(s.formControlInput, s.jumboInput, c.inputHeight)}
                                    parse={phoneParser}
                                />
                            </FormGroup>
                            <FormGroup className={cx(c.formGroup, c.buttonLeft)}>
                                <Loader
                                    type={"button"}
                                    buttonType={"submit"}
                                    show={isLoading}
                                    className={cx(c.btnPrimary, c.btnlarge)}
                                    disabled={submitting}
                                    label={formatMessage(messages.save)}
                                    containerClass={c.loaderContainer}
                                    handleClick={this.submitForm}
                                    containerClass={c.loaderContainer}
                                />
                            </FormGroup>
                        </Form>
                    </span>

                }
            </div>
        );
    }
}

AvailableDates = reduxForm({
    form: 'CalendarPrice', // a unique name for this form
    // validate
})(AvailableDates);

const selector = formValueSelector('CalendarPrice');

const mapState = (state) => ({
    isSpecialPrice: selector(state, 'isSpecialPrice'),
});

const mapDispatch = {
    change,
    getListBlockedDates,
    getListingDataStep3,
    manageListingSteps
};

export default compose(
    injectIntl,
    withStyles(s, c),
    connect(mapState, mapDispatch),
    graphql(gql`
    mutation (
      $listId: Int!, 
      $blockedDates: [String],
      $calendarStatus: String,
      $isSpecialPrice: Float
    ) {
          UpdateBlockedDates (
            listId: $listId, 
            blockedDates: $blockedDates,
            calendarStatus: $calendarStatus,
            isSpecialPrice: $isSpecialPrice
        ) {
          status
        }
        }
  `, {
        name: 'updateBlockedDates'
    }
    ),
    graphql(gql`
      mutation RemoveBlockedDates(
      $listId: Int!,
      $blockedDates: [String],
      ){
          RemoveBlockedDates(
          listId: $listId, 
          blockedDates: $blockedDates,
          ) {
              status
          }
      }
  `, {
        name: 'removeBlockedDates'
    }),
)(AvailableDates);
