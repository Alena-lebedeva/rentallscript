import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MapResults.css';
import cx from 'classnames';

// Redux
import { connect } from 'react-redux';

// Redux form
import { formValueSelector, change, submit } from 'redux-form';

// Google Places Map Component
//import GoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMapLoader from "react-google-maps-loader";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from "react-google-maps";
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

// Assets
import mapPinIcon from './map-pin.png';

// Component
import MapListingItem from '../MapListingItem';
import RedoSearch from '../RedoSearch';
import CustomOverlayView from './CustomOverlayView';
import CurrencyConverter from '../../CurrencyConverter';

// Actions
import { setPersonalizedValues } from '../../../actions/personalized';

const refs = {};

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height + 8),
});



const GoogleMapPlace =
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      ref={(map) => {
        props.handleFitBounds(map)
        refs.map = map;
      }}
      center={props.center}
      onClick={props.onMapClick}
      onDragStart={props.handleOnDragStart}
      onDragEnd={props.handleOnDragEnd}
      onZoomChanged={props.onZoomChanged}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      onCenterChanged={(e) => props.onCenterChanged(e)}
      defaultOptions={{
        minZoom: 2,
        maxZoom: 18,
        mapTypeControl: false,
        streetViewControl: false,
        navigationControl: false,
        backgroundColor: '',
        streetViewControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        draggable: true,
        fullscreenControl: false,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
              color: '#a4ddf5'
            }]
          }
        ]
      }}
    >
      {
        props.markers.map((marker, key) => {
          let icon = props.getMarkerIcon(marker);
          let pixelOffset = new google.maps.Size(-140, 0);

          return (
            <div key={key}>
              <Marker
                position={marker.position}
                clickable={true}
                icon={{
                  url: icon,
                  scale: 5,
                }}
                onClick={() => props.onMarkerClick(marker)}
                key={Math.random()}
                zIndex={100 + key}
              >
                {
                  !marker.showInfo && <CustomOverlayView
                    position={{ lat: marker.lat, lng: marker.lng }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={getPixelPositionOffset}
                  >
                    <div className={cx(s.customMarkerContainer, { [s.hoveredMarker]: marker.hovered == true })}>
                      <div className={s.customMarkerPointBorder}></div>
                      <div className={s.customMarkerContent}>
                        <CurrencyConverter
                          amount={marker.basePrice}
                          from={marker.currency}
                        />
                      </div>
                      <div className={s.customMarkerPoint}></div>
                    </div>
                  </CustomOverlayView>
                }
                {
                  marker.showInfo && <InfoBox
                    onCloseClick={() => {
                      props.onMarkerClose(marker)
                    }}
                    options={{
                      closeBoxURL: ``,
                      alignBottom: true,
                      boxStyle: {
                        width: "278px",
                        paddingTop: '50px',
                        paddingBottom: '5px',
                        minHeight: "145px",
                        maxWidth: "278px",
                        overflow: "hidden"
                      },
                      pixelOffset: pixelOffset,
                      enableEventPropagation: true,
                    }}
                    defaultPosition={marker.position}
                    zIndex={330}
                  >
                    <div>
                      <MapListingItem
                        id={marker.id}
                        basePrice={marker.basePrice}
                        currency={marker.currency}
                        title={marker.title}
                        beds={marker.beds}
                        personCapacity={marker.personCapacity}
                        roomType={marker.roomType}
                        coverPhoto={marker.coverPhoto}
                        listPhotos={marker.listPhotos}
                        bookingType={marker.bookingType}
                        reviewsCount={marker.reviewsCount}
                        reviewsStarRating={marker.reviewsStarRating}
                        wishListStatus={marker.wishListStatus}
                        isListOwner={marker.isListOwner}
                        onCloseClick={() => { props.onMarkerClose(marker) }}
                      />
                    </div>
                  </InfoBox>
                }
              </Marker>
            </div>
          )
        })
      }
    </GoogleMap>
  ));

class MapResults extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      personCapacity: PropTypes.number,
      dates: PropTypes.string
    }),
    searchSettings: PropTypes.shape({
      minPrice: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
      priceRangeCurrency: PropTypes.string,
      defaultLocation: PropTypes.string,
      defaultLat: PropTypes.number,
      defaultLng: PropTypes.number
    }).isRequired,
    chosenLat: PropTypes.number,
    chosenLng: PropTypes.number,
    total: PropTypes.number,
    results: PropTypes.array,
    personalized: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    change: PropTypes.any,
    submit: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
      center: {
        lat: 0,
        lng: 0
      },
      markers: [],
      bounds: {},
      searchByMapResults: false,
      isMapDrag: false,
      isMapZoom: false,
    };
    this.onMapClick = this.onMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleFitBounds = this.handleFitBounds.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.getCenter = this.getCenter.bind(this);
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.handleZoomChanged = this.handleZoomChanged.bind(this);
    this.handleMapTouch = this.handleMapTouch.bind(this);
    this.handleMapUnTouch = this.handleMapUnTouch.bind(this);
    this.getMarkerIcon = this.getMarkerIcon.bind(this);
    this.generateIcon = this.generateIcon.bind(this);
  }

  componentDidMount() {
    const { results, initialFilter, searchSettings, personalized, markerHighlight } = this.props;
    const { center, hover } = this.state;
    var bounds = new google.maps.LatLngBounds();

    if (results && results.length > 0) {
      let positions = [];

      results.map((item) => {
        let data = {};
        data["lat"] = item.lat,
          data["lng"] = item.lng,
          data["position"] = new google.maps.LatLng(item.lat, item.lng);
        data["id"] = item.id;
        data["basePrice"] = item.listingData.basePrice;
        data["currency"] = item.listingData.currency;
        data["title"] = item.title;
        data["beds"] = item.beds;
        data["personCapacity"] = item.personCapacity;
        data["roomType"] = item.settingsData[0].listsettings.itemName;
        data["coverPhoto"] = item.coverPhoto;
        data["listPhotos"] = item.listPhotos;
        data['bookingType'] = item.bookingType;
        data["reviewsCount"] = item.reviewsCount;
        data['reviewsStarRating'] = item.reviewsStarRating;
        data["wishListStatus"] = item.wishListStatus;
        data['isListOwner'] = item.isListOwner;
        data['hovered'] = hover;
        positions.push(data);
        bounds.extend(new google.maps.LatLng(item.lat, item.lng));
      })
      this.setState({ markers: positions, bounds });
    } else {
      let defaultCordinates;
      if (personalized && personalized.lat && personalized.lng) {
        let centerValue = {
          lat: personalized.lat,
          lng: personalized.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
        let centerValue = {
          lat: initialFilter.lat,
          lng: initialFilter.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else {
        let defaultCordinates = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { results, personalized, initialFilter, searchByMapValue, markerHighlight } = nextProps;
    const { center, searchByMapResults } = this.state;
    let { hover } = this.state;
    var bounds = new google.maps.LatLngBounds();

    this.setState({
      searchByMapResults: searchByMapValue
    });

    if (results && results.length > 0) {
      let positions = [];

      results.map((item) => {
        let data = {};
        if (markerHighlight) {
          hover = markerHighlight.id == item.id ? true : false;
        }
        let position = new google.maps.LatLng(item.lat, item.lng);
        data["lat"] = item.lat,
          data["lng"] = item.lng,
          data["position"] = new google.maps.LatLng(item.lat, item.lng);
        bounds.extend(position);
        data["id"] = item.id;
        data["basePrice"] = item.listingData.basePrice;
        data["currency"] = item.listingData.currency;
        data["title"] = item.title;
        data["beds"] = item.beds;
        data["personCapacity"] = item.personCapacity;
        data["roomType"] = item.settingsData[0].listsettings.itemName;
        data["coverPhoto"] = item.coverPhoto;
        data["listPhotos"] = item.listPhotos;
        data['bookingType'] = item.bookingType;
        data["reviewsCount"] = item.reviewsCount;
        data['reviewsStarRating'] = item.reviewsStarRating;
        data["wishListStatus"] = item.wishListStatus;
        data['isListOwner'] = item.isListOwner;
        data['hovered'] = hover;
        positions.push(data);
      });
      this.setState({
        markers: positions,
        bounds
      });
    } else {
      let defaultCordinates;
      if (personalized && personalized.lat && personalized.lng) {
        let centerValue = {
          lat: personalized.lat,
          lng: personalized.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
        let centerValue = {
          lat: initialFilter.lat,
          lng: initialFilter.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        if (!searchByMapResults) {
          this.setState({ markers: [], bounds, center: centerValue });
        }
      } else {
        let defaultCordinates = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(defaultCordinates);
        if (!searchByMapResults) {
          this.setState({ markers: [], bounds });
        }
      }
    }
  }

  componentWillUnmount() {
    const { change } = this.props;
    change('SearchForm', 'initialLoad', true);
  }

  handleFitBounds(map) {
    const { bounds, markers, searchByMapResults } = this.state;
    const { initialLoad } = this.props;
    if (map != null && bounds != null) {
      //setCenter
      (initialLoad) ? map.fitBounds(bounds) : true;
    }
  }

  handleBoundsChanged() {
    let center = new google.maps.getCenter();
  }

  onMapClick() {
    const { markers } = this.state;
    if (markers.length > 0) {
      /*this.setState({
        markers: markers.map(marker => {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon2
          };
          return marker;
        })
      });*/
    }
  }

  getCenter(e) {
    let center, lat, lng, northEast, southWest;
    if (refs && refs.map) {
      center = refs.map.getCenter();
      lat = center.lat();
      lng = center.lng();
    }
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
            icon: mapPinIcon,
            hovered: true
          };
        } else {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon,
            hovered: false
          };
        }
        return marker;
      }),
      center: {
        lat: targetMarker.lat,
        lng: targetMarker.lng
      },
      bounds: null
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon,
            hovered: false
          };
        }
        return marker;
      }),
    });
  }

  getMarkerIcon(marker) {
    const svg = this.generateIcon(marker);

    return 'data:image/svg+xml;base64,' + window.btoa(svg);
  }

  generateIcon(marker) {
    let opts = {
      fontSize: '10px',
      fontColor: 'transparent',
      strokeColor: 'transparent',
      strokeWeight: 0,
      path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
      fillColor: 'transparent',
    };

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="35" viewBox="-24 -48 48 48">
        <defs>
        </defs>
        <path class="marker-icon" stroke="${opts.strokeColor}" stroke-width="${opts.strokeColor}" fill="${opts.fillColor}" 
          d="${opts.path}" />
      </svg>
    `;
  }

  async handleOnDragStart() {
    const { change, submit } = this.props;
    this.setState({
      isMapDrag: true
    });
    await change('SearchForm', 'initialLoad', false);
  }

  async handleMapTouch() {
    const { change, submit } = this.props;
  }

  async handleMapUnTouch() {
    const { change, submit } = this.props;
  }

  async handleZoomChanged() {
    const { change, submit, searchByMapValue } = this.props;
    const { isMapDrag, isMapZoom } = this.state;
    if (refs && refs.map && isMapZoom === false) {
      this.setState({
        isMapZoom: !isMapZoom
      });
    }

    let center, lat, lng, bounds, northEast, southWest, zoom;
    let new_sw, new_ne, new_bounds;
    if (refs && refs.map && isMapZoom) {
      center = refs.map.getCenter();
      zoom = refs.map.getZoom();
      lat = center.lat();
      lng = center.lng();
      bounds = refs.map.getBounds();
      northEast = bounds.getNorthEast();
      southWest = bounds.getSouthWest();
      new_sw = new google.maps.LatLng(southWest.lat(), southWest.lng());
      new_ne = new google.maps.LatLng(northEast.lat(), northEast.lng());
      new_bounds = new google.maps.LatLngBounds(new_sw, new_ne);
      // this.setState({
      //   bounds: new_bounds,
      //   searchByMapResults: searchByMapValue,

      // });
      //refs.map.panToBounds(new_bounds);
      //refs.map.fitBounds(bounds);

      await change('SearchForm', 'initialLoad', false);

      if (searchByMapValue) {
        await change('SearchForm', 'lat', lat);
        await change('SearchForm', 'lng', lng);
        await change('SearchForm', 'sw_lat', southWest.lat());
        await change('SearchForm', 'sw_lng', southWest.lng());
        await change('SearchForm', 'ne_lat', northEast.lat());
        await change('SearchForm', 'ne_lng', northEast.lng());
        //await change('SearchForm', 'searchByMap', true);
        await submit('SearchForm');
      }
    }

  }

  async handleOnDragEnd() {
    const { change, submit, searchByMapValue, setPersonalizedValues } = this.props;
    const { isMapDrag } = this.state;
    let center, lat, lng, bounds, northEast, southWest;
    let new_sw, new_ne, new_bounds, zoom;

    if (refs && refs.map && isMapDrag) {
      center = refs.map.getCenter();
      zoom = refs.map.getZoom();
      lat = center.lat();
      lng = center.lng();
      bounds = refs.map.getBounds();
      northEast = bounds.getNorthEast(); // Max
      southWest = bounds.getSouthWest(); // Min
      new_sw = new google.maps.LatLng(southWest.lat(), southWest.lng());
      new_ne = new google.maps.LatLng(northEast.lat(), northEast.lng());
      new_bounds = new google.maps.LatLngBounds(new_sw, new_ne);

      await change('SearchForm', 'initialLoad', false);
      if (searchByMapValue) {
        await change('SearchForm', 'lat', lat);
        await change('SearchForm', 'lng', lng);

        await setPersonalizedValues({ name: 'lat', value: Number(lat) });
        await setPersonalizedValues({ name: 'lng', value: Number(lng) });

        await change('SearchForm', 'sw_lat', southWest.lat());
        await change('SearchForm', 'sw_lng', southWest.lng());
        await change('SearchForm', 'ne_lat', northEast.lat());
        await change('SearchForm', 'ne_lng', northEast.lng());
        //await change('SearchForm', 'searchByMap', true);
        await submit('SearchForm');
      }
    }
  }

  render() {
    const { center, markers, bounds, zoom } = this.state;
    const { searchByMapValue } = this.props;
    return (
      <div className={cx(s.mapCanvas, 'searchMap')}>
        {/* <ReactGoogleMapLoader
          params={{
            key: googleMapAPI, // Define your api key here
            libraries: "places,geometry,markerwithlabel"// To request multiple libraries, separate them with a comma
          }}
          render={googleMaps =>
            googleMaps && ( */}
        <GoogleMapPlace
          containerElement={
            <div style={{ width: '100%', height: '100%' }} />
          }
          mapElement={
            <div style={{ width: '100%', height: '100%' }} />
          }
          center={center}
          markers={markers}
          onMapClick={this.onMapClick}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
          handleOnDragStart={this.handleOnDragStart}
          handleOnDragEnd={this.handleOnDragEnd}
          onZoomChanged={this.handleZoomChanged}
          handleFitBounds={this.handleFitBounds}
          handleBoundsChanged={this.handleBoundsChanged}
          onCenterChanged={this.getCenter}
          onMouseOver={this.handleMapTouch}
          onMouseOut={this.handleMapUnTouch}
          getMarkerIcon={this.getMarkerIcon}
        />
        {/* )}
        /> */}
        <div className={cx('hidden-xs hidden-sm')}>
          <RedoSearch />
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  results: state.search.data,
  total: state.search.count,
  personalized: state.personalized,
  searchByMapValue: selector(state, 'searchByMap'),
  initialLoad: selector(state, 'initialLoad'),
  markerHighlight: selector(state, 'markerHighlight')
  //chosenLat: selector(state, 'lat'),
  //chosenLng: selector(state, 'lng'),
});

const mapDispatch = {
  change,
  submit,
  setPersonalizedValues
};

export default withStyles(s)(connect(mapState, mapDispatch)(MapResults));
