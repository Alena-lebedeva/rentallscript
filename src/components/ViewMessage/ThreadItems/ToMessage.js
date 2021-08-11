import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

// Component
import Avatar from '../../Avatar';

class ToMessage extends Component {
  static propTypes = {
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  };

  static defaultProps = {
    createdAt: null
  };

  render() {
    const { profileId, picture, displayName, content, createdAt } = this.props;
    let date = createdAt != null ? moment(createdAt).format('D MMM YYYY') : '';

    return (
      <div>
        <div >
          <div className={cx(s.space5)}>
            <div className={s.displayTable}>
              <div className={s.displayTableRow}>
                <div className={cx(s.displayTableCell, s.displayTableWidth, s.radiusColor)}>
                  <Panel className={cx(s.panelDark, s.panelBubble, s.panelText, s.panelBubbleRight)}>
                    <span>
                    {
                      content && (content.trim()).split("\n").map(function (item, index) {
                        return (
                          <span key={index}>{item}<br /></span>
                        )
                      })
                    }
                    </span>
                    <div className={cx(s.timeText, s.spaceTop2)}>
                      <span>{date}</span>
                    </div>
                  </Panel>
                </div>
                <div className={cx(s.displayTableCell, s.displayTableWidthTwo)}>
                  <div className={s.profileAvatarSection}>
                    <Avatar
                      source={picture}
                      height={70}
                      width={70}
                      title={displayName}
                      className={s.profileAvatar}
                      withLink
                      linkClassName={s.profileAvatarLink}
                      profileId={profileId}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ToMessage);