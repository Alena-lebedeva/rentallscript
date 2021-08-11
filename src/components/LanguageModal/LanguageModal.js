// General
import React from 'react';

import { connect } from 'react-redux';
import { setLocale } from '../../actions/intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LanguageModal.css';

import { closeHeaderModal } from '../../actions/modalActions';

import { formatLocale } from '../../helpers/formatLocale';

class LanguageModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(value) {
    const { setLocale, closeHeaderModal } = this.props;
    setLocale({ locale: value });
    await closeHeaderModal('languageModal');
  }

  render() {
    const { currentLocale, availableLocales, closeHeaderModal } = this.props;
    let localeList = availableLocales && availableLocales.filter(o => o !== currentLocale);

    return (
      <div>
        <div onClick={() => closeHeaderModal('languageModal')} className={cx(s.mainSection)}>
          <div className={cx(s.activeItem, s.activeSection)}>
            {formatLocale(currentLocale)}
          </div>
        </div>
        {
          localeList && localeList.length > 0 && localeList.map((item, key) => {
            return (
              <div onClick={() => this.handleChange(item)} className={cx(s.mainSection)}>
                <div className={cx(s.activeItem)}>
                  {formatLocale(item)}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }

}

const mapState = state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale,
});

const mapDispatch = {
  setLocale,
  closeHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(LanguageModal));
