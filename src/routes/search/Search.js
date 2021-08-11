// General
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { formValueSelector } from 'redux-form';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import * as Material from 'react-icons/lib/md';
import s from './Search.css';

// Components
import SearchForm from '../../components/SearchListing/SearchForm';
import SearchResults from '../../components/SearchListing/SearchResults';
import MapResults from '../../components/SearchListing/MapResults';
import Loader from '../../components/Loader';
// New Design
import SearchHeader from '../../components/SearchListing/SearchHeader';

// Redux Action
import { showMap, showResults, showForm, showFilter } from '../../actions/mobileSearchNavigation';
import { getListingFields } from '../../actions/getListingFields';

import ReactGoogleMapLoader from "react-google-maps-loader";
import { googleMapAPI } from '../../config';

class Search extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.object,
    searchSettings: PropTypes.object,
    filterToggle: PropTypes.bool,
    showMap: PropTypes.func.isRequired,
    showResults: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
    mobileSearch: PropTypes.shape({
      searchMap: PropTypes.bool,
      searchResults: PropTypes.bool,
      searchForm: PropTypes.bool
    }),
    getListingFields: PropTypes.func,
  };

  static defaultProps = {
    mobileSearch: {
      searchMap: false,
      searchResults: true,
      searchForm: false,
      searchFilter: false
    },
    isMapShow: true
  };

  constructor(props) {
    super(props);

    this.state = {
      smallDevice: false,
      load: false
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
    const { getListingFields } = this.props;
    // Get listing settings fields data
    getListingFields();
  }

  componentDidMount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

    this.setState({
      load: true
    })
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize(e) {
    const { showResults } = this.props;
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 768px)').matches : false;
    if (smallDevice) {
      showResults();
    }
    this.setState({ smallDevice });
  }

  mobileNavigation() {
    const {
      mobileSearch: { searchMap, searchResults },
      showMap,
      showResults,
      showForm
    } = this.props;

    let leftNav, rightNav;
    if (searchResults) {
      leftNav = <Button className={cx(s.filterButton, s.locationBtn)} bsStyle="link" onClick={() => showMap()}><Material.MdRoom className={s.icon} /></Button>;
      rightNav = <Button className={cx(s.filterButton)} bsStyle="link" onClick={() => showForm()}><FormattedMessage {...messages.filters} /><FontAwesome.FaSliders /></Button>
    }

    if (searchMap) {
      leftNav = <Button className={cx(s.filterButton)} bsStyle="link" onClick={() => showResults()}><FormattedMessage {...messages.results} />{' '}<Material.MdSettingsInputComposite className={s.icon} /></Button>
      rightNav = <Button className={cx(s.filterButton)} bsStyle="link" onClick={() => showForm()}><FormattedMessage {...messages.filters} /><FontAwesome.FaSliders /></Button>
    }

    return (
      <div className={cx(s.mobileNavigation)}>
        <div className={s.buttonOuter}>
          <div className={cx(s.buttonContainer)}>
            {
              leftNav
            }
            {
              //rightNav
            }
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      mobileSearch: { searchMap, searchResults, searchForm, searchFilter },
      searchSettings,
      initialFilter,
      filterToggle,
      isMapShow,
      showFilter,
      showResults
    } = this.props;

    const { smallDevice, load } = this.state;


    let DesktopResults = true;
    if (filterToggle === true) {
      DesktopResults = false;
    }
    const isBrowser = typeof window !== 'undefined';
    
    if (!load || !isBrowser) {
      return (
        <div className={s.searchLoaderContainer}>
          <Loader type={"text"} />
        </div>
      );
    }

    return (
      <div className={cx(s.root, 'searchPage')}>
        <div className={s.container}>
          {
            !smallDevice && <SearchHeader searchSettings={searchSettings}  />
          }
          {
            smallDevice && !searchMap && <SearchHeader showFilter={showFilter} showResults={showResults} searchSettings={searchSettings} />
          }
          <div className={cx(s.searchResultContainer, { [s.listItemOnly]: isMapShow == false })}>
            {/* {
              !smallDevice && <div className={cx(s.filtersBody)}>
                <SearchForm initialFilter={initialFilter} searchSettings={searchSettings} />
              </div>
            }

            {
              smallDevice && searchForm && <div className={cx(s.filtersBody)}>
                <SearchForm initialFilter={initialFilter} searchSettings={searchSettings} />
              </div>
            } */}

            {
              !smallDevice && DesktopResults && <div className={cx(s.resultsBody)}>
                <SearchResults />
              </div>
            }

            {
              smallDevice && searchResults && <div className={cx(s.resultsBody)}>
                <SearchResults />
              </div>
            }

          </div>

          {
            !smallDevice && isMapShow && <div className={cx(s.searchMapContainer, 'searchMapSection')}>
              <ReactGoogleMapLoader
                params={{
                  key: googleMapAPI, // Define your api key here
                  libraries: "places,geometry,markerwithlabel"// To request multiple libraries, separate them with a comma
                }}
                render={googleMaps =>
                  googleMaps && (
                    <MapResults initialFilter={initialFilter} searchSettings={searchSettings} />
                  )}
              />
            </div>
          }

          {
            smallDevice && searchMap && <div className={cx(s.searchMapContainer, 'searchMapSection')}>
              <MapResults initialFilter={initialFilter} searchSettings={searchSettings} />
            </div>
          }

          {
            !searchForm && this.mobileNavigation()
          }

        </div>
      </div>
    );
  }
}

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  filterToggle: state.toggle.filterToggle,
  mobileSearch: state.mobileSearch.data,
  isMapShow: state.personalized.showMap
});

const mapDispatch = {
  showMap,
  showResults,
  showForm,
  getListingFields,
  showFilter
};

export default withStyles(s)(connect(mapState, mapDispatch)(Search));
