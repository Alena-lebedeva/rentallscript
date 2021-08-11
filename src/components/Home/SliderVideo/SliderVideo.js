import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

//React Player
import ReactPlayer from 'react-player';

// Redux
import { connect } from 'react-redux';
import s from './SliderVideo.css';
import cx from 'classnames';

import DetailSearchForm from '../DetailSearchForm';

import bannerone from './BannerOne.jpeg';
import bannertwo from './BannerTwo.jpeg';
import bannerthree from './BannerThree.jpeg';
import bannerfour from './BannerFour.jpeg';

class SliderVideo extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };
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
        const { data: { loading, getBanner } } = this.props;
        const { siteVideo } = this.props;
        const settings = {
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
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        initialSlide: 0,
                        swipe: true,
                        swipeToSlide: true,
                        touchMove: true,
                    }
                },
                {
                    breakpoint: 600,
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
                },
                {
                    breakpoint: 480,
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
                }
            ]
        };

        return (
            <div>
                <div className={cx('homeBannerSlider videoDesignSlider')}>
                    <div className={s.homePosition}>
                        <div className={cx(s.homeCarsoual, s.videoCarousel, 'videoBanner')}>
                            {/* <ReactPlayer
                                url={siteVideo}
                                playing={true}
                                loop={true}
                                className={cx(s.videoBackground, s.videoWidth, s.videoWidthSize)}
                            /> */}
                            <Slider {...settings}>
                                <div>
                                    <div className={s.bgHeight}>
                                        <div className="sliderBg" style={{ backgroundImage: `url(${bannerone})` }}>

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className={s.bgHeight}>
                                        <div className="sliderBg" style={{ backgroundImage: `url(${bannertwo})` }}>

                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <div className={s.bgHeight}>
                                        <div className="sliderBg" style={{ backgroundImage: `url(${bannerthree})` }}>

                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <div className={s.bgHeight}>
                                        <div className="sliderBg" style={{ backgroundImage: `url(${bannerfour})` }}>

                                        </div>
                                    </div>

                                </div>
                            </Slider>
                        </div>
                        <div className={cx(s.container, s.FormBookWrap)}>
                            {
                                !loading && getBanner && <div className={s.BookWrap}>
                                    <h1><span>{getBanner.title}</span>
                                        {' '} {getBanner.content}
                                    </h1>
                                    <DetailSearchForm />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = state => ({
    siteVideo: state.siteSettings.data.videoLink
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SliderVideo)));
