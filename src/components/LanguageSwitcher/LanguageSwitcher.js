// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setLocale } from '../../actions/intl';

// Style
import { FormControl } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LanguageSwitcher.css';

// Constants
const localeDict = {
  'en-US': 'English',
  'es': 'Español',
  'it-IT': 'Italiano',
  'fr-FR': 'Français',
  'pt-PT': 'Português',
};
const localeName = locale => localeDict[locale] || locale;

class LanguageSwitcher extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { setLocale } = this.props;
    setLocale({ locale: event.target.value });
  }

  render() {
    const { currentLocale, availableLocales } = this.props;
    return (
      <FormControl value={currentLocale} componentClass="select" className={s.formControlSelect} onChange={this.handleChange}>
        {availableLocales.map(locale => (
          <option key={locale} value={locale}>{localeName(locale)}</option>
        ))}
      </FormControl>
    );
  }

}

LanguageSwitcher.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  availableLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLocale: PropTypes.any.isRequired,
};

const mapState = state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale,
});

const mapDispatch = {
  setLocale,
};

export default withStyles(s)(connect(mapState, mapDispatch)(LanguageSwitcher));
