// General
import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux actions
import { getLocationData } from '../../actions/getLocation';

// Google Places Suggest Component
import ReactGoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";

// Styles
import { FormControl } from 'react-bootstrap';

// Constants
import { googleMapAPI } from '../../config';

class PlacesSuggest extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.any,
    googleMaps: PropTypes.object,
    getLocationData: PropTypes.any,
  };

  handleSearchChange = (e) => {
    return e.target.value;
  }

  handleSelectSuggest = (suggest, coordinate) => {
    this.props.getLocationData(suggest.formatted_address);
    return suggest.formatted_address;
  }

  render() {

    const { value, onChange, label, className } = this.props;

    return (
      <div>
        <ReactGoogleMapLoader
          params={{
            key: googleMapAPI, // Define your api key here
            libraries: "places", // To request multiple libraries, separate them with a comma
          }}
          render={googleMaps =>
            googleMaps && (
              <GooglePlacesSuggest
                googleMaps={googleMaps}
                autocompletionRequest={{
                  input: value,
                }}
                onSelectSuggest={(suggest, coordinate) => onChange(this.handleSelectSuggest(suggest, coordinate))}
                search={value}
                textNoResults={null}
              >
                <FormControl
                  type="text"
                  placeholder={label}
                  onChange={(e) => onChange(this.handleSearchChange(e))}
                  onKeyPress={e => {
                    if (e.key === 'Enter') e.preventDefault();
                  }
                  }
                  className={className}
                />
              </GooglePlacesSuggest>
            )}
        />
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  getLocationData,
};


export default connect(mapState, mapDispatch)(PlacesSuggest);
