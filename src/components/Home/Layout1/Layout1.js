import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../SliderAnimation/SliderAnimation.css';
import cx from 'classnames';
import { connect } from 'react-redux';

// Components
import SliderAnimation from '../SliderAnimation/SliderAnimation';
import LocationSearchForm from '../LocationSearchForm';
class Layout1 extends React.Component {
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
        const { data, data: { loading, getBanner }, homeBannerImages } = this.props;

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
                        <div className={cx(s.container, s.ContainerTab)}>
                            {
                                !loading && getBanner && <div className={s.sliderContent}>
                                    <h1 className={cx(s.noMargin, s.bannerCaptionText)}>
                                        <span className={s.bannerCaptionHighlight}>
                                            {getBanner.title}
                                        </span>
                                        {' '} {getBanner.content}
                                    </h1>
                                    <div className={s.searchbox}>
                                        <LocationSearchForm />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Layout1));
