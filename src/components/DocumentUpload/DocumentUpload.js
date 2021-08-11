import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { toastr } from 'react-redux-toastr';

// Style
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

// Component
import DocumentList from '../DocumentList';

//compose
import { graphql, gql, compose } from 'react-apollo';

const query = gql`query ShowDocumentList {
    ShowDocumentList {
        id
        userId,
        fileName,
        fileType
    }
  }`;

class DocumentUpload extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.complete = this.complete.bind(this);
    this.dropzone = null;
  }

  componentDidMount() {
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
    /*const { listId, createListPhotos } = this.props;
    const { files } = fromServer;
    let fileName = files[0].filename;
    let fileType = files[0].mimetype;
    // Calling Redux action to create a record for uploaded file
    if(listId != undefined) {
      createListPhotos(listId, fileName, fileType);
    }*/
  }

  async complete(file) {
    const { mutate } = this.props;
    let variables = {};
    if (file && file.xhr) {
      const { files } = JSON.parse(file.xhr.response);
      let fileName = files[0].filename;
      let fileType = files[0].mimetype;
      variables = {
        fileName,
        fileType
      };
      const { data } = await mutate({
        variables,
        refetchQueries: [{ query }]
      });

      if (data && data.uploadDocument) {
        if (data.uploadDocument.status === 'success') {
          toastr.success("Success!", "Your document has been uploaded successfully!");
        } else {
          toastr.error("Error!", "Something went wrong!");
        }
      }
    }
    this.dropzone.removeFile(file);
  }

  render() {
    const { placeholder, listId } = this.props;
    const djsConfig = {
      dictDefaultMessage: placeholder,
      addRemoveLinks: false,
      maxFilesize: 10,
      maxFiles: 10,
      acceptedFiles: 'image/*,application/pdf',
      hiddenInputContainer: '.dzInputContainer'
    };
    const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.pdf'],
      postUrl: '/documents'
    };
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      success: this.success,
      complete: this.complete,
    };

    return (
      <div className={cx('listPhotoContainer')}>
        <div className={cx('dzInputContainer')}>
          <DropzoneComponent
            config={componentConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          />
        </div>
        <DocumentList />
      </div>
    );
  }

}

const mapState = (state) => ({});

const mapDispatch = {};

export default compose(withStyles(s),

  graphql(gql`mutation uploadDocument($fileName: String,$fileType: String,){
     uploadDocument(
       fileName: $fileName,
       fileType: $fileType
     ) {    
         fileName
         fileType
         status        
        }
 }`
  ),
  (connect(mapState, mapDispatch)))
  (DocumentUpload);

