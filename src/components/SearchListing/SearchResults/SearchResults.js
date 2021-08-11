import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { change, submit as submitForm, formValueSelector, reduxForm } from 'redux-form';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchResults.css';
import cx from 'classnames';
import {
  Row
} from 'react-bootstrap';

// Component
import CustomPagination from '../CustomPagination';
import ListingItem from '../ListingItem';
import NoResults from '../NoResults';

import submit from '../SearchForm/submit';

class SearchResults extends React.Component {
  static propTypes = {
    change: PropTypes.any,
    submitForm: PropTypes.any,
    results: PropTypes.array,
    currentPage: PropTypes.number,
    total: PropTypes.number,
    isResultLoading: PropTypes.bool
  };

  static defaultProps = {
    results: [],
    //isResultLoading: false,
    showMap: false,
    showMapLoader: false
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount() {
    const { currentPage } = this.props;
    if (currentPage != undefined) {
      this.setState({ page: currentPage });
    }
  }


  componentWillReceiveProps(nextProps) {
    const { currentPage } = nextProps;
    if (currentPage != undefined) {
      this.setState({ page: currentPage });
    }
  }

  async handlePagination(currenctPage, size) {
    const { change, submitForm } = this.props;
    await change('currentPage', currenctPage);
    await submitForm('SearchForm');
  }

  render() {
    const { page } = this.state;
    const { results, total, isResultLoading, showMap, showMapLoader } = this.props;

    if (results != null && results.length > 0) {
      return (
        <div className={cx(s.searchResults, { [s.listItemOnly]: showMap == false })}>
          {
            !showMapLoader && <Row className={s.noMargin}>

              <div className={cx(s.resultsContainer)}>
                {/* <Loader
                    type={"page"}
                    show={isResultLoading}
                  /> */}
                {
                  isResultLoading && <div className={s.loadingOverlay} />
                }
                {
                  results.map((item, listIndex) => {
                    return (
                      <div className={cx(s.listItem, s.displayInlineBlock)} key={item.id}>
                        <ListingItem
                          id={item.id}
                          basePrice={item.listingData.basePrice}
                          currency={item.listingData.currency}
                          title={item.title}
                          beds={item.beds}
                          personCapacity={item.personCapacity}
                          roomType={item.settingsData[0].listsettings.itemName}
                          coverPhoto={item.coverPhoto}
                          listPhotos={item.listPhotos}
                          bookingType={item.bookingType}
                          reviewsCount={item.reviewsCount}
                          reviewsStarRating={item.reviewsStarRating}
                          wishListStatus={item.wishListStatus}
                          isListOwner={item.isListOwner}
                        />
                      </div>
                    )
                  })
                }
              </div>
              <div className={s.resultsFooter}>
                <div className={s.resultsPagination}>
                  <div className={s.pagination}>
                    <CustomPagination
                      total={total}
                      current={page}
                      defaultCurrenct={1}
                      defaultPageSize={12}
                      handleChange={this.handlePagination}

                    />
                  </div>
                </div>
              </div>

            </Row>
          }
        </div>
      );

    } else {
      return (
        <div>
          {
            isResultLoading && <div className={s.loadingOverlay} />
          }
          <NoResults />
        </div>
      );
    }
  }
}

SearchResults = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(SearchResults);


const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  results: state.search.data,
  currentPage: selector(state, 'currentPage'),
  total: state.search.count,
  isResultLoading: state.search.isResultLoading,
  showMap: state.personalized.showMap,
  showMapLoader: state.loader.showMapLoading
});

const mapDispatch = {
  change,
  submitForm,
};

export default withStyles(s)(connect(mapState, mapDispatch)(SearchResults));
