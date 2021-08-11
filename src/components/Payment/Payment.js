import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import logoUrl from './logo-small.jpg';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

// Components
import Avatar from '../Avatar';
import ListCoverPhoto from '../ListCoverPhoto';
import PaymentDetails from './PaymentDetails';
import PaymentForm from './PaymentForm';

// Locale
import messages from '../../locale/messages';

class Payment extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      formatMessage: PropTypes.any,
      hostData: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
      }),
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        personCapacity: PropTypes.number.isRequired,
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.array.isRequired,
        settingsData: PropTypes.arrayOf(PropTypes.shape({
          listsettings: PropTypes.shape({
            itemName: PropTypes.string.isRequired
          })
        })),
        houseRules: PropTypes.array,
        listingData: PropTypes.shape({
          cancellation: PropTypes.shape({
            policyName: PropTypes.string.isRequired
          })
        })
      }),

    }),
  };

  render() {
    const { data: { hostData: { firstName, picture } } } = this.props;
    const { data: { listData: { title, city, state, country, personCapacity, listingData } } } = this.props;
    const { data: { id, checkIn, checkOut, guests, message } } = this.props;
    const { data: { listData: { coverPhoto, listPhotos, settingsData, houseRules } } } = this.props;
    const { data: { total, basePrice, cleaningPrice, guestServiceFee, discountType, discount, currency } } = this.props;

    let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, Do MMM') : '';
    let amount = total + guestServiceFee;
    let initialValues = {
      reservationId: id,
      amount,
      currency,
      message,
      guests,
      title
    };

    return (
      <Grid>
        <Row>
          <Col md={5} mdPush={7}>
            <div className={cx(s.summaryCard, s.colCenter)}>
              <ListCoverPhoto
                className={cx(s.bannerImage, s.backgroundCover)}
                coverPhoto={coverPhoto}
                listPhotos={listPhotos}
                photoType={"x_medium"}
                bgImage
              />
              <div className={cx(s.hostProfilePhoto, s.pullRight, s.space3)}>
                <div className={s.profileAvatarSection}>
                  <Avatar
                    source={picture}
                    title={firstName}
                    className={cx(s.profileAvatar, s.profileAvatarLink)}
                  />
                </div>
              </div>
              <Panel className={s.panelHeader}>
                <div className={cx(s.textMuted, s.space2)}>
                  <span><FormattedMessage {...messages.hostedBy} /> {firstName}</span>
                </div>
                <div className={cx(s.textLarge, s.space1)}>
                  <span>{title}</span>
                </div>
                <div className={cx(s.textMuted)}>
                  <ul className={s.listStyle}>
                    <li>
                      {settingsData[0].listsettings.itemName}
                    </li>
                  </ul>
                  <div> {city}, {state}, {country} </div>
                </div>
                <div className={s.spaceTop2}>
                  <hr className={s.horizondalLine} />
                  <Row className={cx(s.spaceTop3, s.space3)}>
                    <Col xs={5} sm={5}>
                      <div className={cx(s.textGray, s.space1)}>
                        <span><FormattedMessage {...messages.checkIn} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkInDate}</div>
                    </Col>
                    <Col xs={1} sm={1}>
                      <FontAwesome.FaChevronRight className={cx(s.textGray, s.chevronIcon)} />
                    </Col>
                    <Col xs={5} sm={5} className={cx(s.pullRight, s.textLeft)}>
                      <div className={cx(s.textGray, s.space1)}>
                        <span><FormattedMessage {...messages.checkOut} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkOutDate}</div>
                    </Col>
                  </Row>
                  <hr className={s.horizondalLine} />
                </div>

                <PaymentDetails
                  checkIn={checkIn}
                  checkOut={checkOut}
                  total={total}
                  basePrice={basePrice}
                  cleaningPrice={cleaningPrice}
                  discount={discount}
                  discountType={discountType}
                  serviceFee={guestServiceFee}
                  currency={currency}
                />

                {
                  listingData && listingData.cancellation && <div>
                    <span><FormattedMessage {...messages.cancellationPolicy} />: </span>
                    <span>{listingData.cancellation.policyName}</span>
                  </div>
                }
              </Panel>
            </div>
          </Col>

          <Col md={7} mdPull={5}>
            <PaymentForm
              hostName={firstName}
              houseRules={houseRules}
              allowedGuests={personCapacity}
              initialValues={initialValues}
            />
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default withStyles(s)(Payment);
