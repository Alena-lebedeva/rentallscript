import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

import { connect } from 'react-redux';
import { change } from 'redux-form';
import { startLocationUploaderLoader, doUploadLocation, doRemoveLocation } from '../../../../actions/siteadmin/manageLocationImage';

class Dropzone extends Component {

    static propTypes = {
        doUploadLocation: PropTypes.any.isRequired,
        doRemoveLocation: PropTypes.any.isRequired,
        startLocationUploaderLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: null,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadLocation, data, change } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data.image != null ? data.image : null;
        let filePath = fromServer.file.path;
        let image = fileName;
        doUploadLocation(image, filePath, oldPicture, data.id);
        await change('EditPopularLocation', 'image', fileName);
    }

    addedfile(file, fromServer) {
        const { startLocationUploaderLoader } = this.props;
        startLocationUploaderLoader();
    }

    render() {
        const djsConfig = {
            dictDefaultMessage: 'Click Here to Upload Image',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadLocation'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                />
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    doUploadLocation,
    doRemoveLocation,
    startLocationUploaderLoader,
    change
};

export default withStyles(s)(connect(mapState, mapDispatch)(Dropzone));
