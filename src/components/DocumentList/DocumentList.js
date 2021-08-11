import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DocumentList.css';
import { FormattedMessage } from 'react-intl';

//pdf image
import pdfIcon from './pdf_image.png';

//GraphGL
import ShowDocumentListQuery from './ShowListDocument.graphql';
import RemoveDocumentList from './RemoveDocumentList.graphql';

//toastr
import { toastr } from 'react-redux-toastr';

// Locale
import messages from '../../locale/messages';

class DocumentList extends Component {

  static defaultProps = {
    data: {
      loading: true,
      showDocumentList: []
    },
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(id, fileName) {
    const { mutate } = this.props;

    const { data } = await mutate({
      RemoveDocumentList,
      variables: { id },
      refetchQueries: [{ query: ShowDocumentListQuery }]
    });


    if (data && data.RemoveDocumentList && data.RemoveDocumentList.status == "success") {
      const resp = await fetch('/deleteDocuments', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
        credentials: 'include',
      });
      const { status } = await resp.json();
      toastr.success("Success!", "Document has been removed successfully!");
    }
  }


  render() {
    const { data: { ShowDocumentList }, data } = this.props;
    let path = "/images/document/";

    return (
      <div className={cx('row', s.space2)}>
        {
          ShowDocumentList && ShowDocumentList.map((item, key) => {
            let icon = item.fileType == 'application/pdf' ? pdfIcon : (path + item.fileName);
            return (
              <div key={key} className={cx('col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center')}>
                <a href={path + item.fileName} target="_blank">
                  <div className={s.listPhotoCover}>
                    <div className={s.listPhotoMedia}>
                      <img className={s.imgResponsive} src={icon} />
                    </div>
                  </div>
                </a>
                <a href="javascript:void(0);" onClick={() => this.handleClick(item.id, item.fileName)}>
                  <FormattedMessage {...messages.removeFile} />
                </a>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(ShowDocumentListQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(RemoveDocumentList, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
)(DocumentList);





