import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import moment from 'moment';
import Link from '../../../components/Link';
import Confirm from 'react-confirm-bootstrap';
import {
  Button
} from 'react-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationManagement.css';
import { deletePopularLocation, updateLocationStatus } from '../../../actions/siteadmin/deletePopularLocation';
import history from '../../../core/history';
class PopularLocationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      locationAddress: PropTypes.string,
      isEnable: PropTypes.string,
      images: PropTypes.string,
    })),
    deletePopularLocation: PropTypes.any,
    updateLocationStatus: PropTypes.any,
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push('/siteadmin/popularlocation/add')
  }

  render() {
    const { data, title, deletePopularLocation, updateLocationStatus } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Button onClick={this.handleClick} className={cx(s.button, s.btnPrimary)}>
            Add Popular Location
									</Button>
          <div className={cx('table-responsive', 'popularlocationlist')}>
            <Table className="table"
              noDataText="No records found."
            >
              {
                data && data.map(function (value, key) {
                  let isStatus;
                  return (
                    <Tr key={key}>
                      <Td column={"ID"} data={value.id} />
                      <Td column={"Location"} data={value.location} />
                      <Td column={"Location Address"} className={s.imageurl} data={value.locationAddress} />
                      <Td column={"Image"} className={s.imageurl}>
                        {!value.image ? 'No Image Available' : value.image}
                      </Td>
                      <Td column={"Status"}>
                        {value.isEnable == 'true' ? 'Enabled' : 'Disabled'}
                      </Td>
                      <Td column={"Set Enable / Disable"}>
                        <a href="javascript:void(0)" onClick={() => updateLocationStatus(value.id, value.isEnable)} >
                          {value.isEnable == 'true' ? 'Disable' : 'Enable'}
                        </a>
                      </Td>
                      <Td column="Edit">
                        <Link to={"/siteadmin/edit/popularlocation/" + value.id}>
                          Edit
                              </Link>
                      </Td>
                      <Td column="Delete">
                        <div>
                          <Confirm
                            onConfirm={() => deletePopularLocation(value.id)}
                            body="Are you sure you want to delete this?"
                            confirmText="Confirm Delete"
                            title="Deleting Popular Location"
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
  deletePopularLocation,
  updateLocationStatus
};

export default withStyles(s)(connect(mapState, mapDispatch)(PopularLocationManagement));



