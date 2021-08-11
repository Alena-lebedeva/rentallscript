import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DocumentVerification.css';

import DocumentUpload from '../../components/DocumentUpload';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import cx from 'classnames';

import EditProfileSideMenu from '../../components/EditProfileSideMenu';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../locale/messages';

class DocumentVerification extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={cx(s.landingContainer)}>
            <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
              <EditProfileSideMenu />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
              <h3 className={s.infoTitle}>
                <FormattedMessage {...messages.documentverificaiton} />
              </h3>
              <DocumentUpload placeholder={formatMessage(messages.documentUploadPlaceholder)} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(DocumentVerification));
