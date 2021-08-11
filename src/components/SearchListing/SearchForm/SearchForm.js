import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux form
import { Field, reduxForm, change, formValueSelector } from 'redux-form';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import {
  Button,
  Row,
  Col,
  FormControl,
  Panel
} from 'react-bootstrap';
import s from './SearchForm.css';

// Submit Action
import submit from './submit';

// Locale
import messages from '../../../locale/messages';


// Components
import DateRange from '../DateRange';
import CustomCheckbox from '../../CustomCheckbox';
import PlacesSuggest from '../PlacesSuggest';
import PriceRange from '../PriceRange';
import CurrencyConverter from '../../CurrencyConverter';
import Switch from './Switch';

// Redux Action
import { openSearchFilter, closeSearchFilter, closeAndSubmitSearchFilter } from '../../../actions/toggleControl';
import { getListingFields } from '../../../actions/getListingFields';
import { setPersonalizedValues } from '../../../actions/personalized';
import { showResults } from '../../../actions/mobileSearchNavigation';

class SearchForm extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.shape({
      geography: PropTypes.string,
      address: PropTypes.string,
      personCapacity: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      formatMessage: PropTypes.any,
    }),
    openSearchFilter: PropTypes.any,
    closeSearchFilter: PropTypes.any,
    closeAndSubmitSearchFilter: PropTypes.any,
    getListingFields: PropTypes.any,
    change: PropTypes.any,
    filterToggle: PropTypes.bool,
    fieldsSettingsData: PropTypes.shape({
      roomType: PropTypes.array.isRequired,
      personCapacity: PropTypes.array.isRequired,
      bedrooms: PropTypes.array.isRequired,
      bathrooms: PropTypes.array.isRequired,
      beds: PropTypes.array.isRequired,
      essentialsAmenities: PropTypes.array.isRequired,
      spaces: PropTypes.array.isRequired,
      houseRules: PropTypes.array.isRequired,
    }).isRequired,
    searchSettings: PropTypes.shape({
      minPrice: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
      priceRangeCurrency: PropTypes.string.isRequired,
      defaultLocation: PropTypes.string.isRequired,
      defaultLat: PropTypes.number.isRequired,
      defaultLng: PropTypes.number.isRequired
    }).isRequired,
    priceRangeLabel: PropTypes.array,
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      geography: PropTypes.string,
      personCapacity: PropTypes.number
    }),
    guests: PropTypes.number,
    location: PropTypes.string,
    total: PropTypes.number,
    showResults: PropTypes.any,
  };

  static defaultProps = {
    initialFilter: {
      geography: null,
      address: null,
      personCapacity: null,
      startDate: null,
      endDate: null
    },
    fieldsSettingsData: {
      roomType: [],
      personCapacity: [],
      bedrooms: [],
      bathrooms: [],
      beds: [],
      essentialsAmenities: [],
      spaces: [],
      houseRules: [],
    },
    searchSettings: {
      priceRangeCurrency: "USD",
      defaultLocation: "",
      defaultLat: 0,
      defaultLng: 0
    },
    personalized: {
      location: null,
      lat: null,
      lng: null,
      geography: null,
      sw_lat: null,
      sw_lng: null,
      ne_lat: null,
      ne_lng: null
    },
    total: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleFilterClose = this.handleFilterClose.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
  }


  componentWillMount() {
    const { getListingFields } = this.props;
    // Get listing settings fields data
    getListingFields();
  }

  componentWillReceiveProps(nextProps) {
    const { guests } = nextProps;
    const { personalized, setPersonalizedValues } = this.props;
    if (guests != personalized.personCapacity) {
      setPersonalizedValues({ name: 'personCapacity', value: Number(guests) });
    }
  }

  renderDateRange = ({ input, label, meta: { touched, error }, className, formName, numberOfMonths }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;
    return (
      <div>
        <DateRange
          {...input}
          formName={formName}
          numberOfMonths={numberOfMonths}
          onChange={(value) => {
            input.onChange(value);
            change('currentPage', 1);
            setTimeout(handleSubmit(submit));
          }}
        />
      </div>
    )
  }


  renderPlacesSuggest = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit } = this.props;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <PlacesSuggest
          {...input}
          label={label}
          className={className}
          handleSubmit={handleSubmit(submit)}
        />
      </div>
    )
  }

  renderPriceRange = ({ input, label, meta: { touched, error }, className, min, max, rangeCurrency }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;
    return (
      <div>
        <PriceRange
          {...input}
          min={min}
          max={max}
          from={rangeCurrency}
          handleSubmit={handleSubmit(submit)}
        />
      </div>
    )
  }

  renderSwitch = ({ input, label, meta: { touched, error }, className, min, max, rangeCurrency }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;
    return (
      <div>
        <Switch
          {...input}
          handleSubmit={handleSubmit(submit)}
        />
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, options, initialLabel, name }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;
    return (
      <div>
        <FormControl
          componentClass="select"
          {...input}
          className={className}
          onChange={(value) => {
            input.onChange(value);
            change('currentPage', 1);
            setTimeout(handleSubmit(submit));
          }}
        >
          {
            initialLabel && <option value="">{initialLabel}</option>
          }
          {
            options.map((option, index) => {
              let rows = [];
              for (let i = option.startValue; i <= option.endValue; i++) {
                rows.push(<option value={i}>{i} {i > 1 ? option.otherItemName : option.itemName}</option>);
              }
              return rows;
            })
          }
        </FormControl>
      </div>
    )
  }

  checkboxHorizontalGroup = ({ label, name, options, input }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;
    return (
      <Row>
        {
          options.map((option, index) => {

            if (option.isEnable !== "1") {
              return <span />
            }

            return (
              <Col lg={4} md={4} sm={4} xs={12} className={s.responsiveSpaceBottom} key={index}>
                <label className={cx(s.checkBoxLabel, s.checkBoxLabelPanel)}>
                  <div className={cx(s.checkBoxLabelCell, s.checkBoxLabelCellIcon, s.checkBoxLabelCellInput)}>
                    <FontAwesome.FaHome />
                  </div>
                  <div className={s.checkBoxLabelCell}>
                    {option.itemName}
                  </div>
                  <div className={cx(s.checkBoxLabelCell, s.checkBoxLabelCellInput)}>
                    <CustomCheckbox
                      name={`${input.name}[${index}]`}
                      value={option.id}
                      checked={input.value.indexOf(option.id) !== -1}
                      onChange={event => {
                        const newValue = [...input.value];
                        if (event === true) {
                          newValue.push(option.id);
                        } else {
                          newValue.splice(newValue.indexOf(option.id), 1);
                        }
                        input.onChange(newValue);
                        change('currentPage', 1);
                        setTimeout(handleSubmit(submit));
                      }}
                    />
                  </div>
                </label>
              </Col>
            )
          })
        }
      </Row>
    )
  };

  checkboxGroup = ({ label, name, options, input }) => (
    <Row>
      {
        options.map((option, index) => {
          if (option.isEnable !== "1") {
            return <span />
          }

          return (
            <div>
              <Col lg={6} md={6} sm={12} xs={12} key={index}>
                <span className={cx(s.checkBoxLabel)}>
                  <div className={cx(s.checkBoxLabelCell, s.checkBoxLabelCellIcon, s.checkBoxLabelCellInput)}>
                    <CustomCheckbox
                      name={`${input.name}[${index}]`}
                      value={option.id}
                      checked={input.value.indexOf(option.id) !== -1}
                      onChange={event => {
                        const newValue = [...input.value];
                        if (event === true) {
                          newValue.push(option.id);
                        } else {
                          newValue.splice(newValue.indexOf(option.id), 1);
                        }
                        return input.onChange(newValue);
                      }}
                    />
                  </div>
                  <div className={s.checkBoxLabelCell}>
                    {option.itemName}
                  </div>
                </span>
              </Col>
            </div>
          )
        })
      }
    </Row>
  );

  handleFilterClose() {
    const { closeSearchFilter } = this.props;
    closeSearchFilter();
  }

  handleFilterClick() {
    const { openSearchFilter } = this.props;
    openSearchFilter();
  }

  handleFilterSubmit() {
    const { closeAndSubmitSearchFilter, handleSubmit, change } = this.props;
    closeAndSubmitSearchFilter();
    change('currentPage', 1);
    setTimeout(handleSubmit(submit));
  }



  render() {
    const { error, handleSubmit, submitting, dispatch, filterToggle, fieldsSettingsData, priceRangeLabel, baseCurrency } = this.props;
    const { formatMessage } = this.props.intl;
    const { searchSettings, total, location, showResults } = this.props;
    let showFilterbuttons = false;
    if (filterToggle === true) {
      showFilterbuttons = true;
    }

    let roomType = fieldsSettingsData.roomType;
    let personCapacity = fieldsSettingsData.personCapacity;
    let bedrooms = fieldsSettingsData.bedrooms;
    let bathrooms = fieldsSettingsData.bathrooms;
    let beds = fieldsSettingsData.beds;
    let amenities = fieldsSettingsData.essentialsAmenities;
    let spaces = fieldsSettingsData.spaces;
    let houseRules = fieldsSettingsData.houseRules;
    let minPrice = searchSettings.minPrice;
    let maxPrice = searchSettings.maxPrice;
    let rangeCurrency = searchSettings.priceRangeCurrency;
    let minPriceRange = priceRangeLabel != undefined ? priceRangeLabel[0] : minPrice;
    let maxPriceRange = priceRangeLabel != undefined ? priceRangeLabel[1] : maxPrice;

    return (
      <div className={cx(s.filters, 'SearchPageForm')}>
        <form onSubmit={handleSubmit}>
          {error && <strong>{formatMessage(error)}</strong>}

          <div className={cx(s.filterSection, s.introSection)}>
            <Row>
              <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                <span><FormattedMessage {...messages.location} /></span>
              </Col>
              <Col lg={9} md={9} sm={12} xs={12}>
                <Row>
                  <Col lg={8} md={8} sm={12} xs={12}>
                    <Field
                      name="location"
                      component={this.renderPlacesSuggest}
                      label={formatMessage(messages.location)}
                      className={cx(s.formControlInput)}
                      containerClassName={s.geoSuggestContainer}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className={cx(s.filterSection, s.introSection)}>
            <Row>
              <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                <span><FormattedMessage {...messages.dates} /></span>
              </Col>
              <Col lg={9} md={9} sm={12} xs={12}>
                <Row>
                  <Col lg={6} md={6} sm={6} xs={12} className={'searchDate'}>
                    {/* <Field 
                    name="dates" 
                    component={this.renderDateRange} 
                    formName={'SearchForm'} 
                    numberOfMonths={1}
                  /> */}
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={12}>
                    <Field
                      name="personCapacity"
                      component={this.renderFormControlSelect}
                      className={s.formControlSelect}
                      options={personCapacity}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className={cx(s.filterSection, s.introSection)}>
            <Row>
              <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                <span><FormattedMessage {...messages.roomType} /></span>
              </Col>
              <Col lg={9} md={9} sm={12} xs={12}>
                <Field name="roomType" component={this.checkboxHorizontalGroup} options={roomType} />
              </Col>
            </Row>
          </div>

          <div className={cx(s.filterSection, s.introSection)}>
            <Row>
              <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                <span><FormattedMessage {...messages.priceRange} /></span>
              </Col>
              <Col lg={9} md={9} sm={12} xs={12}>
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Field
                      name="priceRange"
                      component={this.renderPriceRange}
                      min={minPrice}
                      max={maxPrice}
                      rangeCurrency={rangeCurrency}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <span><CurrencyConverter amount={minPriceRange} from={rangeCurrency} /></span>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6} className={cx('text-right')}>
                    <span><CurrencyConverter amount={maxPriceRange} from={rangeCurrency} /></span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className={cx(s.filterSection, s.introSection)}>
            <Row>
              <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                <span>
                  <FontAwesome.FaBolt className={s.instantIcon} />
                  <FormattedMessage {...messages.instantBook} />
                </span>
              </Col>
              <Col lg={9} md={9} sm={12} xs={12}>
                <Row>
                  <div className={cx(s.sectionLabel)}>
                    <Col lg={9} md={9} sm={9} xs={9}>
                      <span><FormattedMessage {...messages.instantBookInfo} /></span>
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={3}>
                      <div className={cx(s.pullRight, 'searchSwitch')}>
                        <Field
                          name="bookingType"
                          component={this.renderSwitch}
                        />
                      </div>
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>

          <div className={cx(s.filterSection)}>
            <Row>
              <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                <span><FormattedMessage {...messages.size} /></span>
              </Col>
              <Col lg={9} md={9} sm={12} xs={12}>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={12} className={s.responsiveSpaceBottom}>
                    <Field
                      name="bedrooms"
                      component={this.renderFormControlSelect}
                      className={s.formControlSelect}
                      options={bedrooms}
                      initialLabel={formatMessage(messages.anyBed)}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={12} className={s.responsiveSpaceBottom}>
                    <Field
                      name="bathrooms"
                      component={this.renderFormControlSelect}
                      className={s.formControlSelect}
                      options={bathrooms}
                      initialLabel={formatMessage(messages.anyBath)}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={12}>
                    <Field
                      name="beds"
                      component={this.renderFormControlSelect}
                      className={s.formControlSelect}
                      options={beds}
                      initialLabel={formatMessage(messages.anyBeds)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          {
            !showFilterbuttons && <div className={cx(s.searchResultsCaption, s.filterSection)}>
              <Row>
                <Col xs={12} sm={6} md={6} lg={6} className={s.space2}>
                  <Button className={cx(s.btn, s.btnPrimaryBorder)} onClick={this.handleFilterClick}>
                    <FormattedMessage {...messages.filter} />
                  </Button>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className={cx(s.showSm)}>
                  <Button className={cx(s.btn, s.btnPrimary)} onClick={showResults}>
                    <FormattedMessage {...messages.seeHomes} />
                  </Button>
                </Col>
                <Col md={6} lg={6} className={cx(s.hideSm)}>
                  <span>{total} <FormattedMessage {...messages.rentals} /></span>{location && <span>&nbsp;&#183;&nbsp;</span>}<span>{location}</span>
                </Col>
              </Row>
            </div>
          }

          <Panel collapsible expanded={filterToggle} id={"filters"} className={cx(s.collapsePanel)}>

            <div className={cx(s.filterSection, s.sectionBorder)}>
              <Row>
                <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                  <span><FormattedMessage {...messages.aminities} /></span>
                </Col>
                <Col lg={9} md={9} sm={12} xs={12}>
                  <Field name="amenities" component={this.checkboxGroup} options={amenities} />
                </Col>
              </Row>
            </div>

            <div className={cx(s.filterSection)}>
              <Row>
                <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                  <span><FormattedMessage {...messages.facilities} /></span>
                </Col>
                <Col lg={9} md={9} sm={12} xs={12}>
                  <Field name="spaces" component={this.checkboxGroup} options={spaces} />
                </Col>
              </Row>
            </div>

            <div className={cx(s.filterSection, s.filterSectionBottom)}>
              <Row>
                <Col lg={2} md={2} sm={12} xs={12} className={cx(s.sectionLabel)}>
                  <span><FormattedMessage {...messages.houseRules} /></span>
                </Col>
                <Col lg={9} md={9} sm={12} xs={12}>
                  <Field name="houseRules" component={this.checkboxGroup} options={houseRules} />
                </Col>
              </Row>
            </div>

            {
              showFilterbuttons && <div className={cx(s.filtersFooter)}>
                <Row>
                  <Col lg={7} lgOffset={5} md={8} mdOffset={4}>
                    <Col lg={6} md={6} sm={6} xs={6} className={s.smSpace}>
                      <Button className={cx(s.btn, s.btnPrimaryBorder, s.fullWidth)} onClick={this.handleFilterClose}>
                        <FormattedMessage {...messages.cancel} />
                      </Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <Button className={cx(s.btn, s.btnPrimary, s.fullWidth)} onClick={this.handleFilterSubmit}>
                        <FormattedMessage {...messages.applyFilters} />
                      </Button>
                    </Col>
                  </Col>
                </Row>
              </div>
            }

          </Panel>
        </form>
      </div>
    );
  }
}


SearchForm = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(SearchForm);

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  filterToggle: state.toggle.filterToggle,
  fieldsSettingsData: state.listingFields.data,
  priceRangeLabel: selector(state, 'priceRangeLabel'),
  guests: Number(selector(state, 'personCapacity')),
  currency: state.currency,
  personalized: state.personalized,
  location: selector(state, 'location'),
  total: state.search.count,
});

const mapDispatch = {
  change,
  openSearchFilter,
  closeSearchFilter,
  closeAndSubmitSearchFilter,
  getListingFields,
  setPersonalizedValues,
  showResults
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SearchForm)));
