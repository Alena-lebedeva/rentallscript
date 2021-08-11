import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';

import { deleteAdminReview } from '../../../actions/siteadmin/AdminReviews/deleteAdminReview';
import Link from '../../../components/Link';
import messages from './messages';
import { graphql, gql, compose } from 'react-apollo';

// Toaster
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviewsManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

import { censorEmail, censorPhone } from '../../../helpers/secureEmail';

import StarRating from '../../StarRating';
import { FormControl } from 'react-bootstrap';
import CustomPagination from '../../CustomPagination';
import reviewsManagement from './reviewsManagement.graphql';

class AdminReviewsManagement extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    editUser: PropTypes.any,
    deleteAdminReview: PropTypes.any,
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  paginationData(currentPage) {

    const { reviewsManagement: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);

  }

  handleClick(searchList) {
    const { reviewsManagement: { refetch } } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState({ currentPage: 1 });
    refetch(variables);
  }

  handleSearchChange = (e) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  deleteReview(id) {
    const { deleteAdminReview } = this.props;
    const { reviewsManagement: { refetch } } = this.props;

    let variables = { currentPage: 1 };
    deleteAdminReview(id);
    this.setState({ currentPage: 1 });
    refetch(variables);
  }

  render() {
    const { editUser, deleteAdminReview, title } = this.props;
    const { currentPage } = this.state;
    const { reviewsManagement: { loading, reviewsManagement } } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={'table-responsive'}>
            <div className={cx('col-md-4', s.seachContent)} >
              <FormControl
                type="text"
                placeholder={'Search'}
                onChange={(e) => this.handleSearchChange(e)}
              />
            </div>
            <Table
              className="table"
              noDataText="No matching records found."
              sortable={true}
            >
              {
                reviewsManagement && reviewsManagement.reviewsData.length > 0 && reviewsManagement.reviewsData.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td column={"List ID"} data={value.listId} />
                      <Td column={"List Title"}>
                        <a
                          href={"/rooms/" + value.listId}
                          target="_blank"
                        >
                          {value.listData ? value.listData.title : 'List is missing'}
                        </a>
                      </Td>
                      <Td column={"Review Content"} data={value.reviewContent} />
                      <Td column={"Review Rating"}>
                        <StarRating className={s.reviewStar} value={value.rating} name={'review'} />
                      </Td>
                      <Td column="Edit">
                        <Link to={"/siteadmin/edit-review/" + value.id}>
                          Edit
                      </Link>
                      </Td>
                      <Td column="Delete">
                        <div>
                          <Confirm
                            onConfirm={() => this.deleteReview(value.id)}
                            body="Are you sure you want to delete this?"
                            confirmText="Confirm Delete"
                            title="Deleting Review"
                          >
                            <a href="javascript:void(0)">Delete</a>
                          </Confirm>
                        </div>
                      </Td> }
                    </Tr>
                  )
                })
              }
            </Table>
            {
              reviewsManagement && reviewsManagement.reviewsData && reviewsManagement.reviewsData.length > 0
              && <div>
                <CustomPagination
                  total={reviewsManagement.count}
                  currentPage={currentPage}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  change={this.paginationData}
                  paginationLabel={'Reviews'}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  deleteAdminReview,
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(reviewsManagement, {
    name: 'reviewsManagement',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only',
    }
  })
)(AdminReviewsManagement);
// export default withStyles(s)(connect(mapState, mapDispatch)(AdminReviewsManagement));

