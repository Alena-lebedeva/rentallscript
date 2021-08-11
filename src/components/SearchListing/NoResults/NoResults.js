
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NoResults.css';

// Locale
import messages from '../../../locale/messages';

class NoResults extends React.Component {
 
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <section>
            <h1 className={s.headingText}><span><FormattedMessage {...messages.noResultsTitle} /></span></h1>
              <div className={s.subHeading}>
                <p><FormattedMessage {...messages.noResultsSubTitle} /></p>
                  <ul>
                    <li>
                      <span><FormattedMessage {...messages.noResultsTerms1} /></span>
                    </li>
                    <li>
                      <span><FormattedMessage {...messages.noResultsTerms2} /></span>
                    </li>
                    <li>
                      <span><FormattedMessage {...messages.noResultsTerms3} /></span>
                    </li>
                  </ul>
              </div>
          </section>
        </div>
    </div>
    );
  }
}

export default withStyles(s)(NoResults);