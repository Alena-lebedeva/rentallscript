// General
import React from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LazyLoadImage.css';
import cx from 'classnames';

class LazyLoadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            imageSrc: null 
        };
    }

    componentDidMount() {
        const { src } = this.props;
        const imageLoader = new Image();
        imageLoader.src = src;
        imageLoader.onload = () => {
            this.setState({ imageSrc: src });
        }; 
    }

    render() {    
        const { placeholderSrc, className, placeholderClassName } = this.props;
        const { imageSrc } = this.state;

        return (
            <div className={s.lazyLoadImageContainer}>
                <span 
                    className={cx(s.lazyLoadImagePreload, placeholderClassName)} 
                    style={{
                        backgroundImage: `url(${placeholderSrc})`
                    }}
                />
                <div 
                    className={cx(s.lazyLoadImageLoaded, className)} 
                    style={{
                        backgroundImage: `url(${imageSrc})`
                    }}
                />
            </div>
        );
    }
}




export default withStyles(s)(LazyLoadImage);