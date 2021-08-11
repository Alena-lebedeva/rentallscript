import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import DropzoneComponent from 'react-dropzone-component';
//Toastr
import { toastr } from 'react-redux-toastr';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

//Config
import { maxUploadSize } from '../../config';

import { connect } from 'react-redux';
import { doUploadProfilePicture, doRemoveProfilePicture, startProfilePhotoLoader, stopProfilePhotoLoader } from '../../actions/manageUserProfilePicture';
class Dropzone extends Component {

    static propTypes = {
        doUploadProfilePicture: PropTypes.any.isRequired,
        doRemoveProfilePicture: PropTypes.any.isRequired,
        startProfilePhotoLoader: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.removeExistingFile = this.removeExistingFile.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    componentDidUpdate() {
        const isBrowser = typeof window !== 'undefined';
        const isDocument = typeof document !== undefined;
        if (isBrowser && isDocument) {
            document.querySelector(".dz-hidden-input").style.visibility = 'visible';
            document.querySelector(".dz-hidden-input").style.opacity = '0';
            document.querySelector(".dz-hidden-input").style.height = '100%';
            document.querySelector(".dz-hidden-input").style.width = '100%';
            document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
        }
    }

    success(file, fromServer) {
        const { doUploadProfilePicture, data } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data != undefined ? data.picture : null;
        doUploadProfilePicture(fileName, oldPicture);
    }

    addedfile(file, fromServer) {
        const { startProfilePhotoLoader, stopProfilePhotoLoader } = this.props;

        let fileFormates = [
            'image/svg+xml',
            'application/sql',
            'application/pdf',
            'application/vnd.oasis.opendocument.presentation',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/epub+zip',
            'application/zip',
            'text/plain',
            'application/rtf',
            'application/vnd.oasis.opendocument.text',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.spreadsheet',
            'text/tab-separated-values',
            'text/calendar'

        ];
        if (file && file.size > (1024 * 1024 * maxUploadSize)) {
            toastr.error('Maximum upload size Exceeded! ', 'Try again with a smaller sized image');
            this.dropzone.removeFile(file);
            stopProfilePhotoLoader();
        } else {
            startProfilePhotoLoader();
        }

        // if (file && file.type == "image/svg+xml" || file.type == "application/sql" || file.type == "application/pdf") {
        if (fileFormates.indexOf(file && file.type) > -1) {
            setTimeout(() => {
                if (file && file.accepted === false) {
                    toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
                    this.dropzone.removeFile(file.name);
                    stopProfilePhotoLoader();
                }
            }, 1000)
        }

        if (file && file.accepted === false) {
            setTimeout(() => {
                if (file && file.accepted === false) {
                    toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
                    this.dropzone.removeFile(file.name);
                    stopProfilePhotoLoader();
                }
            }, 1000)
        }

        if (file && file.accepted === true) {
            setTimeout(() => {
                if (file && file.accepted === true) {
                  
                }
            }, 1000)
        }
    }


    removeExistingFile(fileName) {
        const { doRemoveProfilePicture } = this.props;
        this.dropzone.removeAllFiles();
        doRemoveProfilePicture(fileName);
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { defaultMessage } = this.props;
        const djsConfig = {
            dictDefaultMessage: '',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
            hiddenInputContainer: '.dzInputContainer',
            maxFiles: 20
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadProfilePhoto'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div className={cx('dzInputContainer')}>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                >{defaultMessage}
                </DropzoneComponent>
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    doUploadProfilePicture,
    doRemoveProfilePicture,
    startProfilePhotoLoader,
    stopProfilePhotoLoader
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
