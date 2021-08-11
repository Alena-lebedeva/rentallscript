import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Lightbox from 'react-images';

class ImageSlider extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      sources: []
    };
    this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    const { imageLightBox, sources } = nextProps;
    if(imageLightBox != undefined){
      this.setState({ lightboxIsOpen: imageLightBox });
    }

    if(sources != undefined) {
      this.setState({ sources });
    }

  }

  openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}

	closeLightbox () {
    const { closeImageLightBox } = this.props;
    closeImageLightBox();
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}

	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}

  gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}

  render() {
    const { lightboxIsOpen, currentImage, sources } = this.state;

    return (
      <div>
        <Lightbox
          images={sources}
          isOpen={lightboxIsOpen}
          currentImage={currentImage}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          onClickThumbnail={this.gotoImage}
          showThumbnails={true}
          showImageCount={true}
          showCloseButton={true}
          enableKeyboardInput={true}
        />
      </div>
    );
  }

}

export default ImageSlider;