import React from 'react';
import PropTypes from 'prop-types';

// Assets
import mediumNoImage from './medium_no_image.png';
import largeNoImage from './large_no_image.jpeg';

// components
import LazyLoadImage from '../LazyLoadImage';

class ListCoverPhoto extends React.Component {
    static propTypes = {
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.array,
        className: PropTypes.string,
        bgImage: PropTypes.bool
    };

    static defaultProps = {
        bgImage: false,
        lazyLoad: false
    }

    constructor(props) {
        super(props);
        this.state = {
            photo: null
        };
    }

    componentWillMount() {
        const { coverPhoto, listPhotos } = this.props;
        let activePhoto;
        if (listPhotos != undefined && listPhotos.length > 0) {
            activePhoto = listPhotos[0].name;
            if (coverPhoto != undefined && coverPhoto != null) {
                listPhotos.map((item) => {
                    if (item.id === coverPhoto) {
                        activePhoto = item.name;
                    }
                })
            }
            this.setState({ photo: activePhoto });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { coverPhoto, listPhotos } = nextProps;
        let activePhoto;
        if (listPhotos != undefined && listPhotos.length > 0) {
            activePhoto = listPhotos[0].name;
            if (coverPhoto != undefined && coverPhoto != null) {
                listPhotos.map((item) => {
                    if (item.id === coverPhoto) {
                        activePhoto = item.name;
                    }
                })
            }
            this.setState({ photo: activePhoto });
        }
    }

    render() {
        const { className, photoType, bgImage, lazyLoad } = this.props;
        const { photo } = this.state;
        let path = '', source;
        if (photo != null) {
            source = photo;
            if (photoType != undefined) {
                path = '/images/upload/' + photoType + '_';
            }
        } else {
            if (photoType != undefined) {
                if (photoType === "x_medium") {
                    source = largeNoImage;
                } else if (photoType === "x_small") {
                    source = mediumNoImage;
                }
            } else {
                source = mediumNoImage
            }
        }
        if (lazyLoad && bgImage) {
            return (
                <LazyLoadImage 
                    src={`${path}${source}`}
                    placeholderSrc={'/images/upload/placeholder_' + source}
                    className={className}
                />
            );
        } else if (bgImage) {
            return (
                <div className={className} style={{ backgroundImage: `url(${path}${source})` }}>
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <img src={path + source} className={className}  alt={'ListingCoverImage'}/>
            );
        }
    }
}

export default ListCoverPhoto;
