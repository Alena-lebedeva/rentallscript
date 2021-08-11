// General
import React, { Component } from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HeaderModal.css';
import {
  Button,
  Col,
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeHeaderModal } from '../../actions/modalActions';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import CurrencyModal from '../CurrencyModal';
import LanguageModal from '../LanguageModal';

class HeaderModal extends Component {

  static defaultProps = {
    modalType: 'languageModal'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeHeaderModal, modalStatus, modalType } = this.props;

    return (
      <div>
        <Modal
          show={modalStatus[modalType] || false}
          animation={false}
          onHide={() => closeHeaderModal(modalType)}
          dialogClassName={cx(s.logInModalContainer, 'loginModal', 'headerClose')}
        >
          <Modal.Header closeButton>
            {
              modalType && modalType === 'languageModal' && <div>
                <h1 className={s.modalHeader}> <FormattedMessage {...messages.chooseLanguage} /></h1>
              </div>
            }
            {
              modalType && modalType !== 'languageModal' && <div>
                <h1 className={s.modalHeader}> <FormattedMessage {...messages.chooseACurrency} /></h1>
              </div>
            }

          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div>
              {
                modalType && modalType === 'languageModal' && <LanguageModal />
              }
              {
                modalType && modalType !== 'languageModal' && <CurrencyModal />
              }
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  modalStatus: state.modalStatus
});

const mapDispatch = {
  closeHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(HeaderModal));
