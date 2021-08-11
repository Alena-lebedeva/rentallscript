// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SignupModal.css';
import {
  Button,
  FormGroup,
  Col,
  Modal,
  Image
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeSignupModal, openLoginModal } from '../../actions/modalActions';

// Components
import SocialLogin from '../SocialLogin';
import RegisterForm from '../RegisterForm';
import Link from '../Link';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';
import imageOne from './mail.png';

class SignupModal extends Component {
  static propTypes = {
    closeSignupModal: PropTypes.func,
    signupModal: PropTypes.bool,
    openLoginModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      signupModalStatus: false,
      isFormOpen: false,
    };
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }

  componentDidMount() {
    const { signupModal } = this.props;
    if (signupModal === true) {
      this.setState({ signupModalStatus: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { signupModal } = nextProps;
    if (signupModal === true) {
      this.setState({ signupModalStatus: true });
    } else {
      this.setState({ signupModalStatus: false });
    }
  }

  renderButtons() {
    return (
      <div>
        <SocialLogin />
        <strong className={s.lineThrough}>
          <FormattedMessage {...messages.or} />
        </strong>
        <FormGroup className={s.formGroup}>
          <Button className={cx(s.button, s.btnPrimary)} bsSize="large" onClick={() => this.openForm()} block>
            <Image src={imageOne} className={s.iconPosition} responsive /><FormattedMessage {...messages.signupWithEmail} />
          </Button>
        </FormGroup>
      </div>
    );
  }

  renderForm() {
    return (
      <div>
        <div className={cx(s.formGroup, s.formSection)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.textAlignLeft)}>
            <p className={cx(s.noMargin, s.captionText, s.textAlignCenter)}>
              <FormattedMessage {...messages.signupWith} /> {' '}
              <a href="/login/facebook" className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)}>
                <FormattedMessage {...messages.facebook} />
              </a> {' '}
              <FormattedMessage {...messages.or} /> {' '}
              <a href="/login/google" className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)}>
                <FormattedMessage {...messages.google} />
              </a>
            </p>
          </Col>
        </div>

        <strong className={s.lineThrough}>
          <FormattedMessage {...messages.or} />
        </strong>
        <RegisterForm />
      </div>
    );
  }

  render() {
    const { closeSignupModal, openLoginModal } = this.props;
    const { signupModalStatus, isFormOpen } = this.state;

    return (
      <div>
        <Modal show={signupModalStatus} animation={false} onHide={closeSignupModal} dialogClassName={cx(s.signupModalContainer, 'signupModal')} >
          <Modal.Header closeButton>
            {/* <Modal.Title><FormattedMessage {...messages.signup} /></Modal.Title> */}
          </Modal.Header>
          <Modal.Body bsClass={s.signupModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                {
                  isFormOpen && this.renderForm()
                }

                {
                  !isFormOpen && this.renderButtons()
                }

                <p className={s.captionText}>
                  <small>
                    <FormattedMessage {...messages.terms1} />
                    <span>&nbsp;<Link to={"/privacy"} onClick={closeSignupModal}><FormattedMessage {...messages.termsOfService} /></Link></span>
                  </small>
                </p>

                <hr className={s.horizontalLineThrough} />

                <div className={cx(s.formGroup, s.formSection)}>
                  <Col xs={12} sm={8} md={8} lg={8} className={cx(s.noPadding, s.textAlignLeft, s.smSpace)}>
                    <a href="#" className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)} onClick={openLoginModal}>
                      <FormattedMessage {...messages.alreadyHaveAccount} />
                    </a>
                  </Col>
                  <Col xs={12} sm={4} md={4} lg={4} className={cx(s.noPadding, s.textAlignRight)}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnSmall)} bsSize="small" onClick={openLoginModal}>
                      <FormattedMessage {...messages.login} />
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
  signupModal: state.modalStatus.isSignupModalOpen,
});

const mapDispatch = {
  closeSignupModal,
  openLoginModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(SignupModal));
