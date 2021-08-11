import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HomeSlider.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// Component
import HomeItem from '../HomeItem';

const nextArrowStyle = {
  right: '-12px',
  background: '#fff', color: '#484848', zIndex: '5', width: '36px', height: '36px', top: '35%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848'
};

const prevArrowStyle = {
  left: '-12px',
  background: '#fff', color: '#484848', zIndex: '5', width: '36px', height: '36px', top: '35%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848'
};

const nextArrowMobileStyle = {
  display: 'none', right: '10px',
  background: '#fff', color: '#484848', zIndex: '5', width: '36px', height: '36px', top: '35%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848'
};

const prevArrowMobileStyle = {
  display: 'none', left: '10px',
  background: '#fff', color: '#484848', zIndex: '5', width: '36px', height: '36px', top: '35%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent',  boxShadow: '0px 0px 4px 0px #484848'
};


function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={nextArrowStyle}
      onClick={onClick}
    >
      <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
        style={{ height: '15px', width: '15px', display: 'block', fill: '#484848', position: 'absolute', top: '28%', right: '8px' }}>
        <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
      </svg>
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
      <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
        style={{ height: '15px', width: '15px', display: 'block', fill: '#484848', position: 'absolute', top: '28%', left: '8px' }}>
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>
    </div>
  );
}

function MobileNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={nextArrowMobileStyle}
      onClick={onClick}
    >
    </div>
  );
}

function MobilePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={prevArrowMobileStyle}
      onClick={onClick}
    >
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

  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    const settings = {
      dots: false,
      infinite: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            //arrows: false,
            nextArrow: <MobileNextArrow />,
            prevArrow: <MobilePrevArrow />,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            swipe: true,
            swipeToSlide: true,
            touchMove: true
          }
        },
        {
          breakpoint: 640,
          settings: {
            //arrows: false,
            nextArrow: <MobileNextArrow />,
            prevArrow: <MobilePrevArrow />,
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
          <Col xs={12} sm={12} md={12} lg={12} className={cx("noPadding", 'homeSliderPaading')}>
            {
              <Slider {...settings} className={cx('row homeSlickSlider', s.noMargin)}>
                {
                  data && data.length > 0 && data.map((item, index) => {
                    if (item.listPhotos.length > 0) {
                      return (
                        <div className={cx('col-md-12 col-sm-12 col-xs-12')} key={index}>
                          <HomeItem
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
                            userId={item && item.user && item.user.id}
                          />
                        </div>
                      )
                    }
                  })
                }
              </Slider>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default withStyles(s)(SlideComponent);
