import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingPhotos.css';

import cx from 'classnames';

import Swiper from 'react-id-swiper';

import LazyLoadImage from '../../LazyLoadImage';

const nextArrowStyle = {
  right: '5px',
  color: '#484848', zIndex: '1', width: '34px', height: '34px', top: '42%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
  borderRadius: '50%', position: 'absolute'
};

const prevArrowStyle = {
  left: '5px',
  color: '#484848', zIndex: '1', width: '34px', height: '34px', top: '42%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1)',
  borderRadius: '50%', position: 'absolute'
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
        style={{ height: '13px', width: '13px', display: 'block', fill: '#484848', position: 'absolute', top: '31%', right: '10px' }}>
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
        style={{ height: '13px', width: '13px', display: 'block', fill: '#484848', position: 'absolute', top: '31%', left: '10px' }}>
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>
    </div>
  );
}

class ListingPhotos extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_',
    data: [],
    arrow: true
  };
  constructor(props) {
    super(props);
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.progress = this.progress.bind(this);

    this.state = {
      isBeginning: true,
      isEnd: false
    }
  }

  goNext() {
    this.swiper.slideNext();
  }

  goPrev() {
    this.swiper.slidePrev();
  }
  progress() {
    if (!this.swiper) return;
    if (this.swiper.isEnd) {
      this.setState({ isEnd: true });
    } else if (this.swiper.isBeginning) {
      this.setState({ isBeginning: true });
    } else {
      this.setState({ isEnd: false, isBeginning: false });
    }
  }
  render() {
    const { id, listPhotos, coverPhoto, size, formatURL, title, isMapShow, arrow } = this.props;
    const imagepath = `/images/upload/${size}`;
    const placeholderPath = `/images/upload/placeholder_`;

    let indicators = (listPhotos != null && listPhotos.length > 1) ? true : false;

    const params = {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    }
    return (
      <div className={cx(s.listPhotoContainer, { [s.listPhotoContainerFullWidth]: isMapShow == false }, 'searchSwiper')}>
        <Swiper {...params} ref={node => this.swiper = node !== null ? node.swiper : null}>
          {
            listPhotos != null && listPhotos.length && listPhotos.map((item, itemIndex) => {

              return (
                <div className={cx(s.sliderItem)} key={itemIndex}>
                  <a href={`/rooms/${formatURL(title)}-${id}`} target={'_blank'}>
                    <div className={s.parent}>
                      <div className={cx(s.children)}>
                        <div className={s.content}>
                          {/* <div
                            className={cx(s.imageContent)}
                            style={{ backgroundImage: `url(${imagepath}${item.name})` }}
                          /> */}
                          <LazyLoadImage
                            src={`${imagepath}${item.name}`}
                            placeholderSrc={`${placeholderPath}${item.name}`}
                            className={cx(s.imageContent)}
                            placeholderClassName={cx(s.imageContent)}
                          />
                        </div>
                      </div>
                    </div>
                  </a>

                </div>
              )
            })
          }
        </Swiper>
        {arrow && arrow == true && <div className={'searchArrow'}>
          <SamplePrevArrow className={cx('hidden-xs hidden-sm')} onClick={this.goPrev} />
          <SampleNextArrow className={cx('hidden-xs hidden-sm')} onClick={this.goNext} />
        </div>
        }
        <div className="clearBoth"></div>
      </div>
    );
  }
}

export default withStyles(s)(ListingPhotos);

