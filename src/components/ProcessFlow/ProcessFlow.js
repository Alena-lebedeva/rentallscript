import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProcessFlow.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class NewsBox extends React.Component {
  static propTypes = {};

  render() {

    return (
      <Grid className={s.progressContainer}>
        <Row className={s.progressBox}>
          <Col lg={12} md={12} sm={12} xs={12} className={s.smPadding}>
            <div className={cx(s.space5)}>
              <h1 className={cx(s.headerText)}>
                <FormattedMessage {...messages.processFlowHeading} />
              </h1>
            </div>
            <Col lg={12} md={12} sm={12} xs={12} className={cx(s.noPadding, s.spaceTop2)}>
              <Col lg={4} md={4} sm={12} xs={12} className={cx(s.smBottom, s.smPadding)}>
                <div>
                  <h3 className={s.titleText}>
                    <FormattedMessage {...messages.stepOneHeading} />
                  </h3>
                  <p className={cx(s.flowContent)}>
                    <FormattedMessage {...messages.stepOneFlow} />
                  </p>
                </div>
              </Col>
              <Col lg={4} md={4} sm={12} xs={12} className={cx(s.smBottom, s.smPadding)}>
                <div>
                  <h3 className={s.titleText}>
                    <FormattedMessage {...messages.stepTwoHeading} />
                  </h3>
                  <p className={cx(s.flowContent)}>
                    <FormattedMessage {...messages.stepTwoFlow} />
                  </p>
                </div>
              </Col>
              <Col lg={4} md={4} sm={12} xs={12} className={cx(s.smBottom, s.smPadding)}>
                <div>
                  <h3 className={s.titleText}>
                    <FormattedMessage {...messages.stepThreeHeading} />
                  </h3>
                  <p className={cx(s.flowContent)}>
                    <FormattedMessage {...messages.stepThreeFlow} />
                  </p>
                </div>
              </Col>
            </Col>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(NewsBox);
