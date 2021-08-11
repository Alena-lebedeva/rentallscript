// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep2.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class TabBarStep2 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage, photosCount } = this.props;
    const { formatMessage } = this.props.intl;
    let partionClass = s.EditprogressStyle;
    if (photosCount && photosCount > 0) {
      partionClass = s.progressStyle;
    }

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <a className={s.linkReset} onClick={() => nextPage("photos")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, partionClass)}
            title={formatMessage(messages.photos)}
          >
            <FormattedMessage {...messages.photos} />
          </div>
        </a>

        {
          photosCount != undefined && photosCount > 0 && <a className={s.linkReset} onClick={() => nextPage("cover-photo")} href="javascript:void(0);">
            <div
              className={cx(s.textTrunck, s.progressStep, s.progressSection, partionClass)}
              title={formatMessage(messages.setCover)}
            >
              <FormattedMessage {...messages.setCover} />
            </div>
          </a>
        }

        <a className={s.linkReset} onClick={() => nextPage("description")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, partionClass)}
            title={formatMessage(messages.tabDescription)}
          >
            <FormattedMessage {...messages.tabDescription} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("title")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, partionClass)}
            title={formatMessage(messages.tabTitle)}
          >
            <FormattedMessage {...messages.tabTitle} />
          </div>
        </a>

        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep2));

