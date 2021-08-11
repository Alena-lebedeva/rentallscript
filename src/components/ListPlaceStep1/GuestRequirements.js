// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import ListPlaceTips from '../ListPlaceTips';

import updateStep3 from './updateStep3';

class GuestRequirements extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      guestRequirements: []
    };
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({ guestRequirements: listingFields.guestRequirements });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({ guestRequirements: listingFields.guestRequirements });
    }
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { guestRequirements } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>

            <h3 className={cx(s.landingContentTitle, s.space5)}><FormattedMessage {...messages.guestRequirementsTitle} /></h3>
            <p className={cx(s.landingStep3, s.space3)}><span><FormattedMessage {...messages.guestRequirementsDescription} /></span></p>
            <form onSubmit={handleSubmit}>
              <ul className={cx('list-unstyled', s.noPadding, s.noMargin, s.unorderedList)}>
                {
                  guestRequirements.map((item, key) => {
                    if (item.isEnable === "1") {
                      return (
                        <li key={key}>
                          <FontAwesome.FaCheck className={cx(s.checkIcon)} />
                          <span className={cx(s.landingStep3, s.space3)}>
                            {item.itemName}
                          </span>
                        </li>
                      )
                    }
                  })
                }
              </ul>
              <div className={s.nextPosition}>
                <div className={s.nextBackButton}>
                  <hr className={s.horizontalLineThrough} />

                  <FormGroup className={s.formGroup}>
                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                      <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("home")}>
                        <FormattedMessage {...messages.back} />
                      </Button>
                      <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("house-rules")}>
                        <FormattedMessage {...messages.next} />
                      </Button>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </form>

          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    );
  }
}

GuestRequirements = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(GuestRequirements);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(GuestRequirements)));
