import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { graphql, gql, compose } from 'react-apollo';

import {
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Checkbox,
  Dropdown,
  Radio
} from 'react-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DocumentVerification.css';

import DocumentManagement from './DocumentManagementQuery.graphql';

// Send Email
import { sendEmail } from '../../../core/email/sendEmail';

//Document List
import FileList from './FileList';


const query = gql`query showAllDocument
{
  showAllDocument {
    id,
    email,
     profile{
          firstName
    }
    document{      
       fileName
        fileType
        documentStatus
    }
    verification{
      isIdVerification
    }
  }
}
`;
class DocumentVerification extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async handleUpdate(id, status, item) {
    const { mutate } = this.props;
    const { data } = await mutate({
      variables: {
        userId: id,
        isIdVerification: status
      },
      refetchQueries: [{ query }]
    });

    if (data.DocumentManagement.status === 'success') {
      let msg = 'Documents have been ';
      msg += (status) ? 'Approved!' : 'Rejected!';
      let content = {
        name: item.profile.firstName,
        verificationStatus: (status) ? 'approved' : 'rejected'
      }
      await sendEmail(item.email, 'documentVerification', content);
      toastr.success("Success!", msg);
    } else {
      toastr.success("Error!", "Something went wrong!");
    }
  }


  render() {
    const { dataList, intl, title } = this.props;

    let path = "/images/document/";

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={cx('table-responsive')}>
            <Table className="table"
              noDataText="No matching records found."
            >
              {
                dataList && dataList.map((value, key) => {
                  let icon = value.fileType == 'application/pdf' ? 'PDF' : 'Image';
                  return (
                    <Tr key={key}>
                      <Td column={"S.No"} data={key + 1} />
                      <Td column={"Host name"} data={value.profile.firstName} />
                      <Td column={"Host E-mail"} data={value.email} />

                      <Td column="Requested Files">
                        <FileList key={'f' + key} data={value.document} />
                      </Td>

                      <Td column={"Action"}>
                        <div>
                          <a
                            href="javascript:void(0)"
                            onClick={() => this.handleUpdate(value.id, !value.verification.isIdVerification, value)}
                          >
                            <span>{value.verification.isIdVerification ? 'Reject' : 'Approve'}</span>
                          </a>
                        </div>
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

const mapState = (state) => ({
});

const mapDispatch = {

};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(DocumentManagement, { options: { fetchPolicy: 'network-only' } })
)(DocumentVerification);


