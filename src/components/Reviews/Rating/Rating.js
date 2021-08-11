import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Loader from '../../Loader';
import RatingForm from './RatingForm';
import RatingConfirmation from './RatingConfirmation';
import NotFound from '../../../routes/notFound/NotFound'; 
import ListNotFound from '../../../routes/listNotFound/ListNotFound';

class ReviewRating extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      writeReviewData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        hostId: PropTypes.string.isRequired,
        guestId: PropTypes.string.isRequired,
        listData: PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          reviewsCount: PropTypes.number.isRequired,
          street: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          state: PropTypes.string.isRequired,
          country: PropTypes.string.isRequired,
          reviewsCount: PropTypes.number,
          reviewsStarRating: PropTypes.number,
          coverPhoto: PropTypes.number,
          listPhotos: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
          }))
        })
      })
    }),
    userId: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      page1: true,
      page2: false,
    }
    this.gotoPage2 = this.gotoPage2.bind(this);

  }
  gotoPage2() {
    this.setState({ page1: false, page2: true })
  }

  render() {
    const { data: { loading, writeReviewData}} = this.props;
    const { userId } = this.props;
    const { page1, page2 } = this.state;
    
    if(loading) {
      return <Loader type={"text"} />
    }
    if (writeReviewData && writeReviewData.listData) {
      const { data: {writeReviewData: { id, listId, hostId, guestId }} } = this.props;
      let isHost = false;
      if (userId === hostId) {
        isHost = true;
      }
      let initialValues = {
        reservationId: id,
        listId,
        receiverId: isHost ? guestId : hostId
      };
      if (page1 === true) {
        return <RatingForm 
          gotoPage2={this.gotoPage2} 
          data={writeReviewData.listData} 
          initialValues={initialValues}
        />
      }
      if (page2 === true) {
        return <RatingConfirmation data={writeReviewData.listData} />
      }
    } else if(writeReviewData.listData == null){
      return <ListNotFound />
    } else {
      return <NotFound />
    }
  }
}

const mapState = (state) => ({
  userId: state.account.data.userId,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(ReviewRating);
