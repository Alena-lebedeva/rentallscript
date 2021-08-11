import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContactHost.css';
import cx from 'classnames';
import {
  Button,
  Form,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Checkbox,
  Modal,
  Dropdown,
  DropdownButton,
  MenuItem,
  Panel
} from 'react-bootstrap';

// Helper
import validate from './validate';
import submit from './submit';

// Component
import DateRange from '../DateRange';
import Avatar from '../../Avatar';
import Loader from '../../Loader';

// Redux Action
import { contactHostClose } from '../../../actions/message/contactHostModal';

// Locale
import messages from '../../../locale/messages';

class ContactHost extends React.Component {
  static propTypes = {
    showContactHostModal: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    profileId: PropTypes.number.isRequired,
    personCapacity: PropTypes.number.isRequired,
    minNight: PropTypes.number,
    maxNight: PropTypes.number,
    maxDaysNotice: PropTypes.string,
    blockedDates: PropTypes.array,
    availability: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    contactHostClose: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    maximumStay: PropTypes.bool,
  };

  static defaultProps = {
    showContactHostModal: false,
    id: 0,
    userId: null,
    profileId: 0,
    city: null,
    displayName: null,
    picture: null,
    personCapacity: 0,
    minNight: 0,
    maxNight: 0,
    blockedDates: [],
    availability: false,
    startDate: null,
    endDate: null,
    maximumStay: false,
  };

  constructor(props) {
    super(props);
    this.renderGuests = this.renderGuests.bind(this);
    this.renderFormControlSelect = this.renderFormControlSelect.bind(this);
    this.renderFormControlTextArea = this.renderFormControlTextArea.bind(this);
    this.renderWarningBlock = this.renderWarningBlock.bind(this);
  }

  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl;

    let rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? formatMessage(messages.guests) : formatMessage(messages.guest)}</option>);
    }
    return rows;
  }

  renderFormControlSelect({ input, label, meta: { touched, error }, children, className }) {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  renderFormControlTextArea({ input, label, meta: { touched, error }, children, className, placeholder }) {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={placeholder}
        >
          }
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderWarningBlock(content, error) {
    let bgClass;
    if (error) {
      bgClass = s.alertBlockError;
    } else {
      bgClass = s.alertBlockSuccess;
    }
    return (
      <div className={cx(s.alertBlock, bgClass, s.space4)}>
        <div>
          <div className={s.messageText}>
            {content}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { showContactHostModal, contactHostClose } = this.props;
    const { id, personCapacity, minNight, maxNight, maxDaysNotice, blockedDates } = this.props;
    const { userId, profileId, picture, displayName, city } = this.props;
    const { availability, startDate, endDate, isLoading, maximumStay } = this.props;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    let isDateChosen = startDate != null && endDate != null || false;

    let disabled;
    if (!isDateChosen || !availability) {
      disabled = true;
    } else {
      disabled = false;
    }
    //let loadingStatus = loading || isLoading || false;
    let loadingStatus = isLoading || false;
    return (
      <div className={s.root}>
        <Modal show={showContactHostModal} onHide={contactHostClose} animation={false} className={cx(s.modalContainer, 'ContactHost')}>
          <div className={cx(s.modalTable)}>
            <div className={cx(s.modalCell)}>
              <Modal.Header className={s.modalHeading} closeButton>
                <Modal.Title><FormattedMessage {...messages.contactHost} /></Modal.Title>
              </Modal.Header>
              <Modal.Body bsClass={s.logInModalBody}>
                <div className={s.modalDark}>
                  <Row className={s.noMargin}>
                    <Col md={4} className={s.noPadding}>
                      <Panel className={cx(s.hostModal)}>
                        <div className={cx(s.textCenter, s.space2)}>
                          <div className={cx(s.mediaPhoto, s.mediaRound)}>
                            <div className={s.mediaBadge}>
                              <Avatar
                                source={picture}
                                height={120}
                                width={120}
                                title={displayName}
                                className={s.profileAvatar}
                                withLink
                                linkClassName={cx(s.mediaPhoto, s.mediaRound)}
                                profileId={profileId}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className={s.textCenter}>{displayName}</h5>
                          <hr className={cx(s.spaceTop2, s.space2)} />
                          <div>
                            <p><span><FormattedMessage {...messages.contactHostinfo1} />:</span></p>
                            <ul className={s.listText}>
                              <li>
                                <span>
                                  <FormattedMessage {...messages.contactHostinfo2} /> {displayName} <FormattedMessage {...messages.contactHostinfo3} />
                                </span>
                              </li>
                              <li>
                                <span>
                                  <FormattedMessage {...messages.contactHostinfo4} /> {city}?  <FormattedMessage {...messages.contactHostinfo5} />?
                                </span>
                              </li>
                              <li>
                                <span><FormattedMessage {...messages.contactHostinfo6} />!</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Panel>
                    </Col>
                    <Col md={8} className={s.noPadding}>
                      <Loader
                        show={loadingStatus}
                        type={"page"}
                      >
                        <Panel className={cx(s.guestModal, 'guestpanel')}>
                          {
                            !isDateChosen && this.renderWarningBlock(<FormattedMessage {...messages.hostErrorMessage1} />)
                          }
                          {
                            !maximumStay && !availability && isDateChosen && this.renderWarningBlock(<p><FormattedMessage {...messages.hostErrorMessage2} /></p>, "error")
                          }
                          {
                            isDateChosen && maximumStay && this.renderWarningBlock(<p><FormattedMessage {...messages.maximumStay} /> {maxNight} <FormattedMessage {...messages.nights} /></p>, "error")
                          }
                          {
                            availability && isDateChosen && this.renderWarningBlock(<FormattedMessage {...messages.hostErrorMessage3} />)
                          }
                          <div className={s.panelBody}>
                            <h3 className={s.listTitle}><FormattedMessage {...messages.contactHostDate} />?</h3>
                            <div className={s.space4}>
                              <Row>
                                <Form onSubmit={handleSubmit(submit)}>
                                  <Col lg={12} md={12} sm={7} xs={12}>
                                    <span className={'ContactHost'}>
                                      <DateRange
                                        listId={id}
                                        minimumNights={minNight}
                                        maximumNights={maxNight}
                                        blockedDates={blockedDates}
                                        formName={"ContactHostForm"}
                                        maxDaysNotice={maxDaysNotice}
                                      />
                                    </span>
                                  </Col>
                                  <Col lg={12} md={12} sm={5} xs={12} className={cx(s.spaceTop2, s.smNomarginTop)}>
                                    <Field name="personCapacity" component={this.renderFormControlSelect} className={s.formControlSelect} >
                                      <option value="">{formatMessage(messages.chooseGuests)}</option>
                                      {this.renderGuests(personCapacity)}
                                    </Field>
                                  </Col>
                                  <Col lg={12} md={12} sm={12} xs={12} className={s.spaceTop2}>
                                    <div className={s.messagePanel}>
                                      <Field
                                        name="content"
                                        component={this.renderFormControlTextArea}
                                        className={s.textBox}
                                        placeholder={formatMessage(messages.textBoxMessage)}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={12} md={12} sm={12} xs={12} className={s.spaceTop2}>
                                    <Button className={cx(s.btn, s.btnPrimary)} type="submit" disabled={submitting || disabled}>
                                      <FormattedMessage {...messages.sendMessage} />
                                    </Button>
                                  </Col>
                                </Form>
                              </Row>
                            </div>
                          </div>
                        </Panel>
                      </Loader>
                    </Col>
                  </Row>
                </div>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ContactHost = reduxForm({
  form: "ContactHostForm", // a unique name for this form
  validate
})(ContactHost);

// Decorate with connect to read form values
const selector = formValueSelector('ContactHostForm'); // <-- same as form name

const mapState = (state) => ({
  isLoading: state.viewListing.isLoading,
  showContactHostModal: state.viewListing.showContactHostModal,
  availability: state.viewListing.availability,
  maximumStay: state.viewListing.maximumStay,
  startDate: selector(state, 'startDate'),
  endDate: selector(state, 'endDate'),
});

const mapDispatch = {
  contactHostClose
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ContactHost)));

