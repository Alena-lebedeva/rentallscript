import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../SliderAnimation/SliderAnimation.css';
import {
    Image
} from 'react-bootstrap';
import cx from 'classnames';
import { connect } from 'react-redux';
import arrow from './arrow-down.png';

// Components
import DetailSearchForm from '../DetailSearchForm/DetailSearchForm';
import SliderAnimation from '../SliderAnimation/SliderAnimation';

class Layout3 extends React.Component {
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
        const { data, data: { loading, getBanner }, layoutType, homeBannerImages } = this.props;

        let path = '/images/home/xx_large_';
        let homeBannerFirst;

        if (homeBannerImages && homeBannerImages.length > 0) {
            homeBannerFirst = path + homeBannerImages[0].name;
        }

        return (
            <div>
                <div className={cx('homeBannerSlider')}>
                    <div className={cx(s.homePosition, 'homePosition')}>
                        <div className={s.homeCarsoual}>
                            <SliderAnimation data={data} homeBannerImages={homeBannerImages} />
                        </div>
                        <div className={cx(s.container, s.FormBookWrap)}>
                            <div className={s.FormBookWrap}>                            {
                                !loading && getBanner && <div className={s.BookWrap}>
                                    <h1><span>{getBanner.title}</span>
                                        {' '} {getBanner.content}
                                    </h1>
                                    <DetailSearchForm />
                                </div>
                            }
                            </div>
                        </div>

                        {/* <div className={cx(s.container, s.height100, 'visible-xs')}>
                                <div className={s.FormBookWrap}>
                                    {
                                        !loading && getBanner && <div className={s.BookWrap}>
                                            <h1><span>{getBanner.title}</span>
                                                {' '} {getBanner.content}
                                            </h1>
                                            <DetailSearchForm />
                                        </div>
                                    }
                                </div>
                            </div> */}
                    </div>
                </div>
            </div>

        );
    }
}

const mapState = (state) => ({
    //homeBannerImages: state.homeBannerImages
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Layout3));
