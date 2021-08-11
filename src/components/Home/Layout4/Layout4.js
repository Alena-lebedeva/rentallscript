import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout4.css';
import cx from 'classnames';
import { connect } from 'react-redux';

// Components
import DetailSearchForm from '../DetailSearchForm/DetailSearchForm';

class Layout4 extends React.Component {
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
        const { data: { loading, getBanner }, homeBannerImages } = this.props;

        let path = '/images/home/xx_large_';
        let homeBannerFirst;

        if (homeBannerImages && homeBannerImages.length > 0) {
            homeBannerFirst = path + homeBannerImages[0].name;
        }

        return (
            <div className={cx(s.layout4Container)}>
                <div className={cx(s.bannerLayoutContainer)}>
                    <div className={cx(s.bannerBackgroundImage)}
                        style={{ backgroundImage: `url(${homeBannerFirst})` }} />
                </div>
                <div className={s.searchFormContainer}>
                    {
                        !loading && getBanner && <div className={s.searchFormWrap}>
                            <h1><span>{getBanner.title}</span>
                                {' '} {getBanner.content}
                            </h1>
                            <DetailSearchForm />

                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Layout4));
