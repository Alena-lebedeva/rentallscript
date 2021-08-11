import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Row,
  Col,
  ProgressBar,
  Panel,
} from 'react-bootstrap';
import s from './NoItem.css';

// Internal Helpers
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';
 
class NoItem extends React.Component {
  static propTypes = {
    userType: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  handleClick(){
    history.push('/s');
  }

  render() {
    const { userType, type } = this.props;

    return (
        
          <div>
          {
            userType === 'host' && <div>
              { type == 'current' && <p className={s.noResults}> 
                <FormattedMessage {...messages.noUpcomingReservation} /> 
                </p>
              }
              { type != 'current' && <p className={s.noResults}>
                <FormattedMessage {...messages.noPreviousReservation} />
              </p>
              }
            </div>
          }

          {
            userType === 'guest' && <div className={cx(s.textCenter, s.spaceTop4)}>

             <Row className={cx(s.nolistTitle,s.space1)}>
              { type == 'current' && <span><FormattedMessage {...messages.noUpcomingTrips} /></span> }
              { type != 'current' && <span><FormattedMessage {...messages.noPreviousTrips} /></span> }
              </Row>
              <Row className={cx(s.noResults)}>
              <span><FormattedMessage {...messages.noTripTitle2} /></span>
              </Row>
             <Row className={cx(s.spaceTop2, s.space2)}>
                <Button 
                    className={cx(s.button, s.btnPrimary, s.btnlarge)}
                    onClick={this.handleClick}
                >
                     <FormattedMessage {...messages.noTripsButton} />
                  </Button>
              </Row>
            </div>
          }
          </div>
        
    );
  }
}

export default withStyles(s)(NoItem);

