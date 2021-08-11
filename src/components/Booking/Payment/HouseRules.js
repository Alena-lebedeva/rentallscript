import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Panel,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';


// Locale
import messages from '../../../locale/messages';
class HouseRules extends Component {
    static propTypes = {
    	houseRules: PropTypes.array.isRequired,
      hostDisplayName: PropTypes.string.isRequired,
      formatMessage: PropTypes.any,
    };

    render() {
        const { hostDisplayName, houseRules } = this.props;

        return (
            <Panel className={s.houseRulesPanel}>
            <h3 className={cx(s.textCenter, s.h3, s.space4)}>
              <span>{hostDisplayName}'s <FormattedMessage {...messages.houseRules} /></span>
            </h3>
              {
                houseRules.map((item, index) => {
                  if(item.listsettings.isEnable === "1"){
                    return (
                      <div className={s.houseRules} key={index}>
                        <span className={cx(s.displayInline, s.itemWidth)}>{item.listsettings.itemName}</span>
                        <span className={cx(s.displayInline, s.tickWidth)}><FontAwesome.FaCheckCircle className={s.circleIcon} /></span>
                      </div>
                    )
                  }
                })
              }
            </Panel>
        );
    }
}

export default withStyles(s)(HouseRules);

