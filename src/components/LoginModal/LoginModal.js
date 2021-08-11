// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LoginModal.css';
import {
  Button,
  Col,
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeLoginModal, openSignupModal } from '../../actions/modalActions';

// Components
import SocialLogin from '../SocialLogin';
import LoginForm from '../LoginForm';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class LoginModal extends Component {
  static propTypes = {
    closeLoginModal: PropTypes.func,
    loginModal: PropTypes.bool,
    openSignupModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      loginModalStatus: false,
    };
  }

  componentDidMount() {
    const { loginModal } = this.props;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loginModal } = nextProps;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    } else {
      this.setState({ loginModalStatus: false });
    }
  }

  render() {
    const { closeLoginModal, openSignupModal } = this.props;
    const { loginModalStatus } = this.state;

    return (
      <div>
        <Modal
          show={loginModalStatus}
          animation={false}
          onHide={closeLoginModal}
          dialogClassName={cx(s.logInModalContainer, 'loginModal')}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title><FormattedMessage {...messages.login} /></Modal.Title> */}
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <SocialLogin />
                <strong className={s.lineThrough}><FormattedMessage {...messages.or} /></strong>
                <LoginForm />
                <hr className={s.horizontalLineThrough} />
                <div className={cx(s.formGroup, s.formSection)}>
                  <Col xs={12} sm={7} md={7} lg={7} className={cx(s.noPadding, s.textAlignLeft)}>
                    <a href="#" onClick={openSignupModal} className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)}>
                      <FormattedMessage {...messages.noAccount} />
                    </a>
                  </Col>
                  <Col xs={12} sm={5} md={5} lg={5} className={cx(s.noPadding, s.textAlignRight)}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnSmall)} bsSize="small" onClick={openSignupModal}>
                      <FormattedMessage {...messages.signUp} />
                    </Button>
                  </Col>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  loginModal: state.modalStatus.isLoginModalOpen,
});

const mapDispatch = {
  closeLoginModal,
  openSignupModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(LoginModal));
