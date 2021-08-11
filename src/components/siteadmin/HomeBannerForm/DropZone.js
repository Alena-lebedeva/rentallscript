import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropzoneComponent from 'react-dropzone-component';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { toastr } from 'react-redux-toastr';

import { connect } from 'react-redux';
import { startBannerUploaderLoader, doUploadHomeBanner } from '../../../actions/siteadmin/manageHomeBanner';
import { maxUploadSize } from '../../../config';
import { getHomeBannerImages } from '../../../actions/getHomeBannerImages';

class Dropzone extends Component {

    static propTypes = {
        doUploadHomeBanner: PropTypes.any.isRequired,
        startBannerUploaderLoader: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadHomeBanner, data, getHomeBannerImages } = this.props;
        let fileName = fromServer.file.filename;
        let oldImage = data != undefined ? data : null;
        doUploadHomeBanner(fileName, oldImage);
        this.dropzone.removeFile(file);
        getHomeBannerImages();
    }

    addedfile(file, fromServer) {
        const { startBannerUploaderLoader } = this.props;
        startBannerUploaderLoader();
        if (file.size > (1024 * 1024 * maxUploadSize)) {
            toastr.error('Maximum upload size Exceeded! ', 'Try again with a smaller sized image');
            this.dropzone.removeFile(file);
        }
    }

    render() {

        const djsConfig = {
            dictDefaultMessage: 'Drag and Drop your banner or click here to upload',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 4,
            maxFiles: 4,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadHomeBanner'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <DropzoneComponent
                config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
            />
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    doUploadHomeBanner,
    startBannerUploaderLoader,
    getHomeBannerImages
};

export default withStyles(s)(connect(mapState, mapDispatch)(Dropzone));
