
import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MapListingPhotos.css';

import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import Slider from 'react-slick';

import Loader from '../../Loader';

import LazyLoadImage from '../../LazyLoadImage';

const nextArrowStyle = {
  right: '4px',
  color: '#484848', zIndex: '0', width: '34px', height: '34px', top: '50%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: '#fff',
  // backgroundImage: '-webkit-linear-gradient(left,rgba(0,0,0,.0001),rgba(0,0,0,.3))',
  // backgroundImage: '-o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.3) 100%)',
  // backgroundImage: 'linear-gradient(90deg,rgba(0,0,0,.0001) 0,rgba(0,0,0,.3))',
  backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
  borderRadius: '50%',
};

const prevArrowStyle = {
  left: '4px',
  color: '#484848', zIndex: '1', width: '34px', height: '34px', top: '50%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: '#fff',
  // backgroundImage: '-webkit-linear-gradient(left,rgba(0,0,0,.3),rgba(0,0,0,.0001))',
  // backgroundImage: '-o-linear-gradient(left,rgba(0,0,0,.3) 0,rgba(0,0,0,.0001) 100%)',
  // backgroundImage: 'linear-gradient(90deg,rgba(0,0,0,.3) 0,rgba(0,0,0,.0001))',
  backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1)',
  borderRadius: '50%',
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
        style={{ height: '13px', width: '13px', display: 'block', fill: '#484848', position: 'absolute', top: '31%', right: '8px' }}>
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
        style={{ height: '13px', width: '13px', display: 'block', fill: '#484848', position: 'absolute', top: '31%', left: '8px' }}>
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>
    </div>
  );
}

class MapListingPhotos extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_'
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    //setTimeout(() => { this.setState({ loaded: true }) }, 1000)
  }

  render() {
    const { id, listPhotos, coverPhoto, size, formatURL, title } = this.props;
    const { loaded } = this.state;
    let imagepath = '/images/upload/' + size;
    const placeholderPath = `/images/upload/placeholder_`;

    let indicators = (listPhotos != null && listPhotos.length > 1) ? true : false;

    let settings = {
      dots: indicators,
      infinite: indicators,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      swipe: indicators,
      swipeToSlide: indicators,
      touchMove: indicators
    };

    // if (!loaded) {
    //   return (
    //     <div className={s.listPhotoContainer}>
    //       <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)}>
    //           <div className={s.parent}>
    //             <div className={cx(s.children)}>
    //               <div className={s.content}>
    //                 <div className={cx(s.imageContent)}>
    //                   <div className={s.slideLoader}>
    //                     <Loader type={'circle'} show={true} />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className={cx(s.listPhotoContainer, 'arrowShowMobile')}>
        {
          listPhotos != null && listPhotos.length && <div>
            <Slider {...settings}>
              {
                listPhotos.map((item, itemIndex) => {
                  return (
                    <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)} key={itemIndex}>
                      <a href={"/rooms/" + formatURL(title) + '-' + id} target={"_blank"}>
                        <div className={s.parent}>
                          <div className={cx(s.children)}>
                            <div className={s.content}>
                              <LazyLoadImage
                                src={`${imagepath}${item.name}`}
                                placeholderSrc={`${placeholderPath}${item.name}`}
                                className={cx(s.imageContent)}
                                placeholderClassName={cx(s.imageContent)}
                              />
                              {/* <div className={cx(s.imageContent)}
                                style={{ backgroundImage: 'url(' + imagepath + item.name + ')' }}></div> */}
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                })
              }
            </Slider>
          </div>
        }
      </div>
    );

  }
}

export default withStyles(s)(MapListingPhotos);
