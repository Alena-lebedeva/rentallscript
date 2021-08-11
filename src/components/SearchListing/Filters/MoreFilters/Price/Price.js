
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Price.css';

import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Submit
import submit from '../../../SearchForm/submit';

import PriceRange from '../../../PriceRange';
import CurrencyConverter from '../../../../CurrencyConverter';

class Price extends Component {

  static propTypes = {
    className: PropTypes.any,
    searchSettings: PropTypes.shape({
      minPrice: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
      priceRangeCurrency: PropTypes.string.isRequired
    }).isRequired,
  };

  static defaultProps = {
    isExpand: false,
    searchSettings: {
      priceRangeCurrency: "USD",
    }
  };

  constructor(props) {
    super(props);
  }

  renderPriceRange = ({ input, label, meta: { touched, error }, className, min, max, rangeCurrency, minPrice, maxPrice }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;
    return (
      <div className={cx(s.priceRangeContainer, s.space4)}>
        <PriceRange
          {...input}
          min={min}
          max={max}
          minPrice={minPrice}
          maxPrice={maxPrice}
          from={rangeCurrency}
        />
      </div>
    )
  }

  render() {
    const { className, handleTabToggle, isExpand, searchSettings } = this.props;
    const { priceRangeLabel, priceRange } = this.props;
    const { formatMessage } = this.props.intl;

    let minPrice = searchSettings.minPrice;
    let maxPrice = searchSettings.maxPrice;
    let rangeCurrency = searchSettings.priceRangeCurrency;
    let minPriceRange = priceRangeLabel != undefined ? priceRangeLabel[0] : minPrice;
    let maxPriceRange = priceRangeLabel != undefined ? priceRangeLabel[1] : maxPrice;

    return (
      <div className={className}>
        <p className={cx(s.moreFilterTitle, s.space4)}>
          <FormattedMessage {...messages.price} />
        </p>
         <p className={s.captionTitle}>
         <CurrencyConverter amount={minPriceRange} from={rangeCurrency} />
          <span>{' - '}</span>
          <CurrencyConverter amount={maxPriceRange} from={rangeCurrency} />
        </p>
        <Field
          name="priceRange"
          component={this.renderPriceRange}
          min={minPrice}
          max={maxPrice}
          minPrice={minPriceRange}
          maxPrice={maxPriceRange}
          rangeCurrency={rangeCurrency}
        />
      </div>
    );
  }
}

Price = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(Price);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  priceRangeLabel: selector(state, 'priceRangeLabel'),
  priceRange: selector(state, 'priceRange'),
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Price)));