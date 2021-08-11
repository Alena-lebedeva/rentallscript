
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingItem.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import CurrencyConverter from '../../CurrencyConverter';
import ListingPhotos from '../ListingPhotos';
import StarRating from '../../StarRating';

// Locale
import messages from '../../../locale/messages';


class ListingItem extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    id: PropTypes.number,
    basePrice: PropTypes.number,
    currency: PropTypes.string,
    title: PropTypes.string,
    beds: PropTypes.number,
    personCapacity: PropTypes.number,
    roomType: PropTypes.string,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    bookingType: PropTypes.string.isRequired,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number
  };

  render() {
    const { formatMessage } = this.props.intl;
    const {
      id,
      basePrice,
      currency,
      title,
      beds,
      personCapacity,
      roomType,
      coverPhoto,
      listPhotos,
      bookingType,
      reviewsCount,
      reviewsStarRating
    } = this.props;
    let bedsLabel = 'bed';
    let guestsLabel = 'guest';
    if (beds > 1) {
      bedsLabel = 'beds';
    }

    if (personCapacity > 1) {
      guestsLabel = 'guests';
    }
    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }
    let activeItem = 0, photoTemp, photosList = listPhotos.slice();
    if (listPhotos && listPhotos.length > 1) {
      listPhotos.map((x, y) => { if (x.id === coverPhoto) activeItem = y });
      if (activeItem > 0) {
        photoTemp = photosList[0];
        photosList[0] = photosList[activeItem];
        photosList[activeItem] = photoTemp;
      }
    }
    return (
      <div className={cx(s.listItemContainer)}>
        <ListingPhotos
          id={id}
          coverPhoto={coverPhoto}
          listPhotos={photosList}
        />
        <div className={s.listInfo}>
          <a className={s.listInfoLink} href={"/rooms/" + id} target={"_blank"}>
            <Row>
              {/* <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.infoPrice, s.infoText, s.maxwidth)}>
                {roomType}
              </Col> */}
              <Col xs={12} sm={12} md={12} className={cx(s.space1, s.textEllipsis, s.infoDesc, s.infoText, s.infoSpace)}>
                <div className={cx(s.listingInfo)}>
                  <span>{roomType}</span>
                  <span>&nbsp;&#183;&nbsp;</span>
                  <span>{beds} {bedsLabel}</span>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.infoTitle, s.infoText)}>
                <div className={s.displayInline}>
                  {
                    <CurrencyConverter
                      amount={basePrice}
                      from={currency}
                    />
                  }
                  {
                    bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                  }
                </div>{' '}
                <div className={cx(s.displayInline)}>
                  {title}
                </div>
              </Col>
              <Col xs={12} sm={12} md={12}
                className={cx(s.textEllipsis, s.infoReview, s.infoText)}
              >
                <div className={s.reviewStar}>
                  <span className={cx(s.displayInlineBlock)}>
                    <StarRating value={starRatingValue} name={'review'} />
                  </span>
                  <span className={cx(s.reviewText, s.displayInlineBlock)}>
                    &nbsp; {reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
                  </span>
                </div>
              </Col>
            </Row>
          </a>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListingItem));
