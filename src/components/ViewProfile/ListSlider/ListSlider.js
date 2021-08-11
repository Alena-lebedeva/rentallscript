import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';

import s from './ListSlider.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import messages from '../../../locale/messages';

// Component
import ListingItem from '../../SearchListing/ListingItem/ListingItem';

const nextArrowStyle = {
  right: '-5px',
  background: '#fff', color: '#484848', zIndex: '5', width: 'auto', height: 'auto', top: '40%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0 1px 1px 1px rgba(0, 0, 0, 0.14)'
};

const prevArrowStyle = {
  left: '-5px',
  background: '#fff', color: '#484848', zIndex: '5', width: 'auto', height: 'auto', top: '40%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0 1px 1px 1px rgba(0, 0, 0, 0.14)'
};


function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={nextArrowStyle}
      onClick={onClick}
    >
      <FontAwesome.FaAngleRight className={s.navigationIcon} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={prevArrowStyle}
      onClick={onClick}
    >
      <FontAwesome.FaAngleLeft className={s.navigationIcon} />
    </div>
  );
}

class SlideComponent extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
      })),
      coverPhoto: PropTypes.number,
      listingData: PropTypes.shape({
        basePrice: PropTypes.number,
        currency: PropTypes.string,
      }),
      settingsData: PropTypes.arrayOf(PropTypes.shape({
        listsettings: PropTypes.shape({
          itemName: PropTypes.string,
        }),
      })),
      id: PropTypes.number,
      beds: PropTypes.number,
      title: PropTypes.string,
      bookingType: PropTypes.string,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number
    }))
  };

  static defaultProps = {
    data: []
  }

  render() {
    const { data } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 0,
            swipe: true,
            swipeToSlide: true,
            touchMove: true,
          }
        },
        {
          breakpoint: 640,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            swipe: true,
            swipeToSlide: true,
            touchMove: true,
            centerMode: true
          }
        }]
    };

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h2>
              {data && data.length > 1 && <FormattedMessage {...messages.myHostSpaces} />}
              {data && data.length == 1 && <FormattedMessage {...messages.mySpace} />}
            </h2>
            {data.length > 0 && <Slider {...settings} className={cx('row')}>
              {
                data.map((item, index) => {
                  if (item.listPhotos.length > 0) {
                    return (
                      <div className={cx('col-md-12 col-sm-12 col-xs-12')} key={index}>
                        <ListingItem
                          id={item.id}
                          title={item.title}
                          basePrice={item.listingData.basePrice}
                          currency={item.listingData.currency}
                          roomType={item.settingsData[0].listsettings.itemName}
                          beds={item.beds}
                          listPhotos={item.listPhotos}
                          coverPhoto={item.coverPhoto}
                          photo={item.listPhotos[0].name}
                          bookingType={item.bookingType}
                          reviewsCount={item.reviewsCount}
                          reviewsStarRating={item.reviewsStarRating}
                          wishListStatus={item.wishListStatus}
                          isListOwner={item.isListOwner}
                        />
                      </div>
                    )
                  }
                })
              }
            </Slider>}
          </Col>
        </Row>
      </Grid>
    );

  }
};

export default withStyles(s)(SlideComponent);
