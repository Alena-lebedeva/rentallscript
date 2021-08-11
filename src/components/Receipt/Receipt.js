import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import moment from 'moment';
import {
    Row,
    Col,
    Panel,
    Tooltip,
    OverlayTrigger,
} from 'react-bootstrap';
// Component
import CurrencyConverter from '../CurrencyConverter';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Receipt.css';

//Images
import Faq from './question.svg'

// Components
import Link from '../Link';

// Helper
import { generateTime } from './helper';

// Locale
import messages from '../../locale/messages';
import ListNotFound from '../../routes/listNotFound/ListNotFound';

class PaymentReceipt extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        siteName: PropTypes.string.isRequired,
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            basePrice: PropTypes.number.isRequired,
            cleaningPrice: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            discount: PropTypes.number.isRequired,
            discountType: PropTypes.string,
            guestServiceFee: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            confirmationCode: PropTypes.number.isRequired,
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                street: PropTypes.string.isRequired,
                city: PropTypes.string.isRequired,
                state: PropTypes.string.isRequired,
                country: PropTypes.string.isRequired,
                zipcode: PropTypes.string.isRequired,
                listingData: PropTypes.shape({
                    checkInStart: PropTypes.string.isRequired,
                    checkInEnd: PropTypes.string.isRequired
                }),
                settingsData: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    listsettings: PropTypes.shape({
                        itemName: PropTypes.string.isRequired
                    })
                }))
            }),
            hostData: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
            }),
            guestData: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
            }),
            bookingSpecialPricing: PropTypes.array,
        })
    };

    static defaultProps = {
        data: null
    };

    print() {
        window.print();
    }

    render() {
        const { data, siteName, userId } = this.props;
        const { formatMessage } = this.props.intl;

        function LinkWithTooltip({ id, children, href, tooltip }) {
            return (
                <OverlayTrigger
                    overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
                    placement="top"
                    delayShow={300}
                    delayHide={150}
                >
                    {/* <a href={href}>{children}</a> */}
                    {children}
                </OverlayTrigger>
            );
        }

        if (data === null) {
            return <div> <FormattedMessage {...messages.errorMessage} /> </div>;
        } else if (data.listData === null) {
            return <ListNotFound />
        } else {
            const { data, data: { id, checkIn, checkOut, confirmationCode, createdAt, updatedAt, hostId, guestId } } = this.props;
            const { data: { basePrice, cleaningPrice, total, discount, discountType, guestServiceFee, currency, hostServiceFee } } = this.props;
            const { data: { hostData, guestData } } = this.props;
            const { data: { listData: { title, street, city, state, country, zipcode } } } = this.props;
            const { data: { listData: { listingData: { checkInStart, checkInEnd } } } } = this.props;
            const { data: { listData: { settingsData } } } = this.props;
            const { data: { bookingSpecialPricing } } = this.props;

            let roomType = settingsData[0].listsettings.itemName;
            let createdDate = createdAt ? moment(createdAt).format('ddd, MMM Do, YYYY ') : '';
            let updatedDate = updatedAt ? moment(updatedAt).format('ddd, MMM Do, YYYY ') : '';
            let checkInDate = checkIn ? moment(checkIn).format('ddd, Do MMM') : '';
            let checkOutDate = checkOut ? moment(checkOut).format('ddd, Do MMM') : '';
            let momentStartDate, momentEndDate, dayDifference, dayPrice = 0, checkInTime, checkOutTime;
            let isSpecialPricingAssinged = (bookingSpecialPricing && bookingSpecialPricing.length > 0) ? true : false;
            let isAverage = 0, subTotal, userType;
            let isDayTotal = 0;


            if (checkIn != null && checkOut != null) {
                momentStartDate = moment(checkIn);
                momentEndDate = moment(checkOut);
                dayDifference = momentEndDate.diff(momentStartDate, 'days');
                // dayPrice = basePrice * dayDifference;

                if (isSpecialPricingAssinged) {
                    bookingSpecialPricing && bookingSpecialPricing.map((item, index) => {
                        dayPrice = dayPrice + Number(item.isSpecialPrice);
                    });
                } else {
                    dayPrice = basePrice * dayDifference;
                }
            }

            if (checkInStart === 'Flexible') {
                checkInTime = formatMessage(messages.flexibleCheckIn);
            } else {
                checkInTime = generateTime(checkInStart);
            }

            if (checkInEnd === 'Flexible') {
                checkOutTime = formatMessage(messages.flexibleCheckOut);
            } else {
                checkOutTime = generateTime(checkInEnd);
            }

            if (userId === hostId) {
                userType = 'host';
                subTotal = total - hostServiceFee;
            } else {
                userType = 'guest';
                subTotal = total + guestServiceFee;
            }

            isAverage = Number(dayPrice) / Number(dayDifference);
            isDayTotal = isAverage.toFixed(2) * dayDifference;
            dayPrice = isDayTotal;


            return (
                <div className={cx(s.containerResponsive, s.spaceTop4)}>
                    <div className={cx(s.space4, s.rowTable)}>
                        <Col xs={12} sm={12} md={3} lg={3} className={s.noPadding}>
                            <span className={s.textBold}>{createdDate}</span><br />
                            <span><FormattedMessage {...messages.receipt} /> # {id}</span>
                        </Col>
                    </div>

                    <div>
                        <Panel className={s.receiptPanel}>
                            <h2><FormattedMessage {...messages.customerReceipt} /></h2>
                            <div className={cx(s.spaceTop1, s.pullRight)}>
                                <a className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, "hidden-print")} onClick={this.print}>
                                    <FormattedMessage {...messages.receipt} />
                                </a>
                            </div>
                            <div className={s.space1}>
                                <h6><FormattedMessage {...messages.confirmationCode} /> </h6>
                            </div>
                            <div className={s.space1}>
                                <h4>{confirmationCode}</h4>
                            </div>
                            <hr />
                            <Row className={s.space4}>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.name} /></span>
                                    <p>{guestData.displayName}</p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.travelDestination} /></span>
                                    <p>{city}</p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.duration} /></span>
                                    <p>{dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.accommodationType} /></span>
                                    <p>{roomType}</p>
                                </Col>
                            </Row>
                            <hr />

                            <Row className={s.space4}>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.accommodationAddress} /></span>
                                    <h4>{title}</h4>
                                    <p>
                                        <span>{street}</span> <br />
                                        <span>{city}, {state} {zipcode}</span> <br />
                                        <span>{country}</span> <br />
                                    </p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.accommodationHost} /></span>
                                    <p>{hostData.displayName}</p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.checkIn} /></span>
                                    <p>
                                        <span>{checkInDate}</span><br />
                                        <span>{checkInTime}</span>
                                    </p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.checkOut} /></span>
                                    <p>
                                        <span>{checkOutDate}</span><br />
                                        <span>{checkOutTime}</span>
                                    </p>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <h2><FormattedMessage {...messages.reservationCharges} /></h2>
                                    <table className={cx('table', 'table-bordered')}>
                                        <tbody>

                                            <tr className={cx(s.positionR)}>
                                                <th className={s.rowWidth}>
                                                    <div className={cx(s.specialPriceIcon, "hidden-print")}>
                                                        {
                                                            isSpecialPricingAssinged &&
                                                            <span className={s.iconSection}>
                                                                <img src={Faq} className={s.faqImage} />
                                                                {/* <FontAwesome.FaQuestion className={s.toolTipColor} /> */}
                                                            </span>

                                                        }
                                                        <div className={cx(s.tltip, s.relativeSection)}>
                                                            <FormattedMessage {...messages.recepitInfoDesc} />
                                                        </div>
                                                    </div>
                                                    <CurrencyConverter
                                                        // amount={basePrice}
                                                        amount={isAverage}
                                                        from={currency}
                                                    />
                                                    &nbsp;x {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                                                    {/* {
                                                        isSpecialPricingAssinged && <LinkWithTooltip
                                                            tooltip="Average rate per night for your trip."
                                                            // href="#"
                                                            id="tooltip-1"
                                                        >
                                                            <span className={s.iconSection}>
                                                                <FontAwesome.FaQuestion className={s.instantIcon} />
                                                            </span>
                                                        </LinkWithTooltip>
                                                    } */}

                                                </th>

                                                <td>
                                                    <CurrencyConverter
                                                        amount={dayPrice}
                                                        from={currency}
                                                    />
                                                </td>

                                            </tr>

                                            {
                                                cleaningPrice > 0 && <tr>
                                                    <th className={s.rowWidth}>
                                                        <FormattedMessage {...messages.cleaningPrice} />
                                                    </th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={cleaningPrice}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                discount > 0 && <tr>
                                                    <th className={s.rowWidth}>{discountType}</th>
                                                    <td>
                                                        -{' '}<CurrencyConverter
                                                            amount={discount}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                userType === 'guest' && guestServiceFee > 0 && <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.serviceFee} /></th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={guestServiceFee}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                userType === 'host' && hostServiceFee > 0 && <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.serviceFee} /></th>
                                                    <td> - &nbsp;
                                                        <CurrencyConverter
                                                            amount={hostServiceFee}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            <tr>
                                                <th className={s.rowWidth}><FormattedMessage {...messages.total} /></th>
                                                <td>
                                                    <CurrencyConverter
                                                        amount={subTotal}
                                                        from={currency}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {
                                        userType === 'guest' && <table className={cx('table', 'table-bordered')}>
                                            <tbody>
                                                <tr>
                                                    <th className={s.rowWidth}><FormattedMessage {...messages.paymentReceived} /> {updatedDate}</th>
                                                    <td>
                                                        <CurrencyConverter
                                                            amount={subTotal}
                                                            from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                </Col>
                            </Row>
                        </Panel>
                    </div>
                    <div className={s.spaceTop4}>
                        <p>
                            {siteName} <FormattedMessage {...messages.receiptInfo1} />{' '}
                            <FormattedMessage {...messages.receiptInfo2} /> {siteName}.{' '}
                            <FormattedMessage {...messages.receiptInfo3} /> {siteName}.
                      </p>
                    </div>
                </div>
            );
        }
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    userId: state.account.data.userId,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentReceipt)));
