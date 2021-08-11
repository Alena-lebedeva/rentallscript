import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListPlaceTips.css';
import {
  Col
} from 'react-bootstrap';

// Local
import messages from '../../locale/messages';
class ListPlaceTips extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Col xs={12} sm={5} md={5} lg={5} xsHidden>
        <div className={s.helpPanelContainer}>
          <div className={s.helpPanel}>
            <div className={s.helpPanelText}>
              <p>
                <span className={s.helpPanelTextTitle}>
                  <FormattedMessage {...messages.ListPlaceTipOne} />
                </span>
                <span>
                  <FormattedMessage {...messages.ListPlaceTipsTwo} />
                </span>
              </p>
              <p>
                <span className={s.helpPanelTextTitle}>
                  <FormattedMessage {...messages.ListPlaceTipOne} />
                </span>
                <span>
                  <FormattedMessage {...messages.ListPlaceTipsTwo} />
                </span>
              </p>
              <p>
                <span className={s.helpPanelTextTitle}>
                  <FormattedMessage {...messages.ListPlaceTipOne} />
                </span>
                <span>
                  <FormattedMessage {...messages.ListPlaceTipsTwo} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default withStyles(s)(ListPlaceTips);

