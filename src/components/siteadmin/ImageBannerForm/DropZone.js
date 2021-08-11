import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropzoneComponent from 'react-dropzone-component';

import cx from 'classnames';
import {
    Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

import { connect } from 'react-redux';
import { startBannerUploaderLoader, doUploadImageBanner } from '../../../actions/siteadmin/manageImageBanner';

class Dropzone extends Component {

    static propTypes = {
        doUploadImageBanner: PropTypes.any.isRequired,
        startBannerUploaderLoader: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    success(file, fromServer) {
        const { doUploadImageBanner, data } = this.props;
        let fileName = fromServer.file.filename;
        let oldImage = data != undefined ? data : null;
        doUploadImageBanner(fileName, oldImage);
    }

    addedfile(file, fromServer) {
        const { startBannerUploaderLoader } = this.props;
        startBannerUploaderLoader();
    }

    render() {

        const djsConfig = {
            dictDefaultMessage: 'Drag and Drop your logo or click here to upload',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadBanner'
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

const mapState = (state) => ({
});

const mapDispatch = {
    doUploadImageBanner,
    startBannerUploaderLoader
};

export default withStyles(s)(connect(mapState, mapDispatch)(Dropzone));
