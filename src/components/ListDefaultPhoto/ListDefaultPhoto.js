import React from 'react';
import PropTypes from 'prop-types';

// Assets
import mediumNoImage from './medium_no_image.png';
import largeNoImage from './large_no_image.jpeg';

class ListDefaultPhoto extends React.Component {
    static propTypes = {
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.array,
        className: PropTypes.string,
        bgImage: PropTypes.bool
    };

    static defaultProps = {
        bgImage: false
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
        const { className, photoType, bgImage } = this.props;
        const { photo } = this.state;
        let path = '', source;
        if (photo != null) {
            source = photo;
            if (photoType != undefined) {
                path = '/images/upload/' + photoType + '_';
            }
        } else {
            if (photoType != undefined) {
                if (photoType === "xx_large") {
                    source = largeNoImage;
                } else if (photoType === "x_medium") {
                    source = mediumNoImage;
                }
            } else {
                source = mediumNoImage
            }
        }

        if (bgImage) {
            return (
                <div className={className} style={{ backgroundImage: `url(${path}${source})` }}>
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <img src={path + source} className={className} />
            );
        }
    }
}

export default ListDefaultPhoto;
