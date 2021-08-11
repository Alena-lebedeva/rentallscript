import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import s from './ExportCalendar.css';
import cx from 'classnames';
import {
  FormGroup,
  FormControl,
  Modal,
  Panel
} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { url } from '../../../../config';

// Locale
import messages from '../../../../locale/messages';

class ExportCalendar extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      socialshareModalStatus: false,
      isFormOpen: false,
      value: 'Copy Link',
      copied: false,
    };
    this.openForm = this.openForm.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }


  async copyText() {
    this.setState({
      value: 'Link Copied',
      copied: true
    })
    setTimeout(() => {
      this.setState({
        value: 'Copy Link',
        copied: false
      })
    }, 2000)
  }

  render() {
    const { showModal, close, listId } = this.props;
    const { value } = this.state;
    const calendarURL = url + '/export-calendar?id=' + listId;

    return (
      <div>
        <Modal
          show={showModal}
          onHide={close}
          animation={false}
          className={cx(s.modalContainer, 'ContactHost')}
        >
          <div className={cx(s.modalTable)}>
            <div className={cx(s.modalCell)}>
              <Modal.Header className={s.modalHeading} closeButton>
                <Modal.Title><FormattedMessage {...messages.exportCalendar} /></Modal.Title>
              </Modal.Header>
              <Modal.Body bsClass={s.logInModalBody}>
                <Panel className={s.panelHeader}>
                  <form>
                    <div className={s.panelBody}>
                      <p className={s.introText}>
                        <FormattedMessage {...messages.exportCalendarDescription} />{' '}
                        <span className={s.copyLink}>
                          <CopyToClipboard
                            text={calendarURL}
                            onCopy={() => this.copyText()}
                          >
                            <span className={s.pointer}>
                              {value}
                            </span>
                          </CopyToClipboard>
                        </span>
                      </p>
                      <div className={s.space3}>
                        <FormGroup className={s.formGroup}>
                          <FormControl
                            name="url"
                            type="text"
                            value={calendarURL}
                            className={s.formControlInput}
                            readOnly
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </form>
                </Panel>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ExportCalendar)));
