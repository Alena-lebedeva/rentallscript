import React from 'react';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import {
  Button,
  Col
} from 'react-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminRolesManagement.css';

// Redux Actions
import { openAdminRolesModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminRole } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';

// Components
import AdminRolesModal from '../AdminRolesModal';
import Link from '../../Link';

class AdminRolesManagement extends React.Component {

  static defaultProps = {
    data: []
  };

  render() {
    const { data, title, openAdminRolesModal, deleteAdminRole } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <AdminRolesModal />
          <Col xs={12} sm={3} md={3} lg={3} className={cx(s.noPadding, s.buttonMargin)}>
            <Button
              className={cx(s.button, s.btnPrimary, s.marginBottom20)}
              onClick={() => openAdminRolesModal('add')}
            >
            Add New
          </Button>
          </Col>
          <div className={'table-responsive'}>
            <Table
              className="table"
              noDataText="No matching records found."
            >
              {
                data && data.length > 0 && data.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td column={"ID"} data={value.id} />
                      <Td column={"Name"} data={value.name} />
                      <Td column={"Description"} data={value.description} />
                      <Td column={"Edit"}>
                        <Link noLink onClick={() => openAdminRolesModal('edit', value)}>Edit</Link>
                      </Td>
                      <Td column={"Delete"}>
                        <Link noLink onClick={() => deleteAdminRole(value.id)}>Delete</Link>
                      </Td>
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

const mapState = (state) => ({});

const mapDispatch = {
  openAdminRolesModal,
  deleteAdminRole
};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminRolesManagement));

