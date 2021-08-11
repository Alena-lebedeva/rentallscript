import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import Link from '../../../components/Link';
import Confirm from 'react-confirm-bootstrap';
import {
  Button
} from 'react-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BlogManagement.css';
import { deleteBlogDetails, updateBlogStatus } from '../../../actions/siteadmin/deleteBlogDetails';
import history from '../../../core/history';

class BlogManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      locationAddress: PropTypes.string,
      isEnable: PropTypes.bool,
      images: PropTypes.string,
    })),
    deleteBlogDetails: PropTypes.any,
    updateBlogStatus: PropTypes.any,
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push('/siteadmin/page/add')
  }

  render() {
    const { data, title, deleteBlogDetails, updateBlogStatus } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Button onClick={this.handleClick} className={cx(s.button, s.btnPrimary)}>
            Add Page
									</Button>
          <div className={'table-responsive'}>
            <Table className="table"
              noDataText="No records found."
            >
              {
                data && data.map(function (value, key) {
                  return (
                    <Tr key={key}>
                      <Td column={"ID"} data={value.id} />
                      <Td column={"Meta Title"} data={value.metaTitle} />
                      <Td column={"Meta Description"} data={value.metaDescription} />
                      <Td column={"Page Title"} data={value.pageTitle} />
                      <Td column={"Page URL"} data={value.pageUrl} />
                      <Td column={"Footer Category"} data={value.footerCategory} />
                      <Td column={"Status"}>
                        <a href="javascript:void(0)" onClick={() => updateBlogStatus(value.id, value.isEnable)} >
                          {value.isEnable == 1 ? 'Disable' : 'Enable'}
                        </a>
                      </Td>
                      <Td column={"Preview"}>
                        <a href={"/page/" + value.pageUrl} target={'_blank'}>
                          Preview
                                </a>
                      </Td>
                      <Td column="Edit">
                        <Link to={"/siteadmin/edit/page/" + value.id}>
                          Edit
                              </Link>
                      </Td>
                      <Td column="Delete">
                        <div>
                          <Confirm
                            onConfirm={() => deleteBlogDetails(value.id)}
                            body="Are you sure you want to delete this?"
                            confirmText="Confirm Delete"
                            title="Deleting Page Details"
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
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  deleteBlogDetails,
  updateBlogStatus
};

export default withStyles(s)(connect(mapState, mapDispatch)(BlogManagement));



