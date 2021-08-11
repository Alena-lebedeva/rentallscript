import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SliderAnimation.css';
import {
    Grid,
    Image
} from 'react-bootstrap';
import cx from 'classnames';
import { connect } from 'react-redux';
import arrow from './arrow-down.png';

class SliderAnimation extends React.Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.scrollTop = this.scrollTop.bind(this);
    }

    scrollTop() {
        window.scrollTo({
            top: screen.height,
            behavior: 'smooth'
        })
    }

    render() {
        const { data: { loading, getBanner }, layoutType, homeBannerImages } = this.props;
        const settings = {
            vertical: true,
            dots: false,
            fade: true,
            infinite: true,
            speed: 6000,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            draggable: false,
            touchMove: false,
            pauseOnHover: false,
            responsive: [
    
                {
                    breakpoint: 1024,
                    settings: {
                        // slidesToShow: 3,
                        // slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                        fade: true,
                        pauseOnHover: false,
                        
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        // slidesToShow: 3,
                        // slidesToScroll: 1,
                        initialSlide: 0,
                        swipe: true,
                        swipeToSlide: true,
                        touchMove: true,
                        autoplay: false,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        slidesToShow: 0,
                        slidesToScroll: 0,
                        initialSlide: 0,
                        swipe: false,
                        swipeToSlide: false,
                        touchMove: false,
                        centerMode: false,
                        autoplay: false,


                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        slidesToShow: 0,
                        slidesToScroll: 0,
                        initialSlide: 0,
                        swipe: false,
                        swipeToSlide: false,
                        touchMove: false,
                        centerMode: false,
                        autoplay: false,


                    }
                }
            ]
        };

        let path = '/images/home/xx_large_';
        let homeBannerFirst;

        if (homeBannerImages && homeBannerImages && homeBannerImages.length > 0) {
            homeBannerFirst = path + homeBannerImages[0].name;
        }

        return (
            <span>
                {/* <div className={cx('homeBannerSlider', 'hidden-sm hidden-xs')}>
                    <div className={cx(s.homePosition, 'homePosition')}> */}
                        <div className={cx(s.homeCarsoual, 'homeCarsoual')}>
                            <Slider {...settings}>
                                {
                                    homeBannerImages && homeBannerImages.length > 0 && homeBannerImages.map((item, key) => {
                                        return (
                                            <div key={item.id}>
                                                <div className={s.bgHeight}>
                                                    <div
                                                        className="sliderBg"
                                                        style={{ backgroundImage: `url(${path}${item.name})` }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                            <div className={s.downArrow}>
                                <div className={'visible-xs'}>
                                    <Image src={arrow} responsive onClick={this.scrollTop} />
                                </div>
                            </div>
                        </div>
                
            </span>
        );
    }
}

const mapState = (state) => ({
    //homeBannerImages: state.homeBannerImages
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(SliderAnimation));



// export default withStyles(s)(SliderAnimation);
