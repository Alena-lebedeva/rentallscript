import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import {
    FormGroup
} from 'react-bootstrap';

import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';
// Redux
import { connect } from 'react-redux';

import Loader from '../../Loader';
import StarRating from '../../StarRating';

// Component
import CurrencyConverter from '../../CurrencyConverter';
import ViewCount from '../ViewCount';
import BookingForm from './BookingForm';
class Calendar extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        personCapacity: PropTypes.number.isRequired,
        listingData: PropTypes.shape({
            basePrice: PropTypes.number.isRequired,
            cleaningPrice: PropTypes.number,
            currency: PropTypes.string,
            monthlyDiscount: PropTypes.number,
            weeklyDiscount: PropTypes.number,
            minNight: PropTypes.number,
            maxNight: PropTypes.number,
            maxDaysNotice: PropTypes.string,
        }),
        isLoading: PropTypes.bool,
        loading: PropTypes.bool,
        blockedDates: PropTypes.array,
        isHost: PropTypes.bool.isRequired,
        bookingType: PropTypes.string.isRequired,
        formatMessage: PropTypes.any,
        userBanStatus: PropTypes.number,
        reviewsCount: PropTypes.number.isRequired,
        reviewsStarRating: PropTypes.number.isRequired,
    };
    static defaultProps = {
        isLoading: false,
        loading: false,
        blockedDates: [],
        isHost: false,
        listingData: {
            basePrice: 0,
            cleaningPrice: 0,
            monthlyDiscount: 0,
            weeklyDiscount: 0,
            minNight: 0,
            maxNight: 0
        }
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { id, personCapacity, isLoading, isHost, userBanStatus, bookingType } = this.props;
        const { listingData: { basePrice, cleaningPrice, currency, monthlyDiscount, weeklyDiscount, minNight, maxNight, maxDaysNotice, bookingNoticeTime } } = this.props;
        const { loading, blockedDates, startDate, endDate } = this.props;
        const { reviewsCount, reviewsStarRating } = this.props;

        let loadingStatus = loading || isLoading || false;
        let initialValues = {
            startDate,
            endDate
        }
        let starRatingValue = 0;
        if (reviewsCount > 0 && reviewsStarRating > 0) {
            starRatingValue = Number(reviewsStarRating / reviewsCount)
        }

       
        return (
            <div className={cx(s.bookItContainer, 'bookItContentCommon', 'modalMarginTop')}>
                <div className={cx(s.bookItContentBox)} data-sticky-section>
                    <div className={cx(s.bootItPriceSection, 'borderRadiusNone')}>
                        <div className={cx(s.noPadding, s.mobileBg, s.calendarTableCell)}>
                            <div className={cx(s.bookItPriceAmount, s.currenyMarginR)}>
                                {
                                    bookingType === "instant" && <span>
                                        <FontAwesome.FaBolt className={s.instantIcon} />
                                    </span>
                                }
                                <CurrencyConverter
                                    amount={basePrice}
                                    className={s.bookItPrice}
                                    from={currency}
                                />
                            </div>

                            <span className={cx("visible-xs", s.mobileRight)}><FormattedMessage {...messages.perNight} /></span>
                        </div>
                        <div className={cx(s.noPadding, 'text-right', "hidden-xs", s.calendarTableCell)}>
                            <span className="hidden-xs"><FormattedMessage {...messages.perNight} /></span>
                        </div>
                        <div className={cx(s.space2)}>
                            <div className={s.reviewSection}><StarRating name={'review'} value={starRatingValue} /></div>
                            <div>{reviewsCount > 0 && <span>{reviewsCount}{' '}{reviewsCount > 1 ? <FormattedMessage {...messages.reviews} /> : <FormattedMessage {...messages.review} />}</span>}</div>
                        </div>


                    </div>
                    <div className={cx('bookItFormSection')}>
                        <Loader
                            show={loadingStatus}
                            type={"page"}
                        >
                            <div className={cx(s.bookItPanel, 'borderRadiusNone')}>
                                <BookingForm
                                    initialValues={initialValues}
                                    id={id}
                                    personCapacity={personCapacity}
                                    basePrice={basePrice}
                                    cleaningPrice={cleaningPrice}
                                    currency={currency}
                                    monthlyDiscount={monthlyDiscount}
                                    weeklyDiscount={weeklyDiscount}
                                    minNight={minNight}
                                    maxNight={maxNight}
                                    blockedDates={blockedDates}
                                    isHost={isHost}
                                    userBanStatus={userBanStatus}
                                    bookingType={bookingType}
                                    maxDaysNotice={maxDaysNotice}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                                <div>
                                    <FormGroup className={cx(s.formGroup, s.textMuted, 'text-center')}>
                                        <small><FormattedMessage {...messages.bookingInfo} /></small>
                                    </FormGroup>
                                </div>
                                <ViewCount
                                    listId={id}
                                    isHost={isHost}
                                />
                            </div>
                        </Loader>
                    </div>
                </div>
            </div>
        );
    }
}
const mapState = (state) => ({
    isLoading: state.viewListing.isLoading,
});
const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Calendar))