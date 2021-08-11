// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WriteReview.css';

// Component
import ReviewRating from '../../components/Reviews/Rating';

// Graphql
import WriteReviewDataQuery from './WriteReviewData.graphql';

class WriteReview extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    writeReview: PropTypes.shape({
      loading: PropTypes.bool,
      writeReviewData: PropTypes.object
    }),
  };

  static defaultProps = {};

  render() {
    const { writeReview } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <ReviewRating data={writeReview} />
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(WriteReviewDataQuery,
    {
      name: 'writeReview',
      options: (props) => ({
        variables: {
          reservationId: props.reservationId,
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(WriteReview);
