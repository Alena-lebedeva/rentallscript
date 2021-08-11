import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import Link from '../../../components/Link';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticPageManagement.css';
class StaticPageManagement extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>

          <div className={'table-responsive'}>
            <Table className="table"
              noDataText="No records found."
            >

              <Tr>
                <Td column={"ID"} >1</Td>
                <Td column={"Page Name"} >About Us</Td>
                <Td column={"Preview"}>
                  <a href={"/about"} target={'_blank'}>
                    Preview
                        </a>
                </Td>
                <Td column="Edit">
                  <Link to={"/siteadmin/edit/staticpage/1"}>
                    Edit
                      </Link>
                </Td>
              </Tr>

              <Tr>
                <Td column={"ID"} >2</Td>
                <Td column={"Page Name"} >Trust & Safety</Td>
                <Td column={"Preview"}>
                  <a href={"/safety"} target={'_blank'}>
                    Preview
                        </a>
                </Td>
                <Td column="Edit">
                  <Link to={"/siteadmin/edit/staticpage/2"}>
                    Edit
                      </Link>
                </Td>
              </Tr>

              <Tr>
                <Td column={"ID"} >3</Td>
                <Td column={"Page Name"} >Travel Credit</Td>
                <Td column={"Preview"}>
                  <a href={"/travel"} target={'_blank'}>
                    Preview
                        </a>
                </Td>
                <Td column="Edit">
                  <Link to={"/siteadmin/edit/staticpage/3"}>
                    Edit
                      </Link>
                </Td>
              </Tr>

              <Tr>
                <Td column={"ID"} >4</Td>
                <Td column={"Page Name"} >Terms & Privacy</Td>
                <Td column={"Preview"}>
                  <a href={"/privacy"} target={'_blank'}>
                    Preview
                        </a>
                </Td>
                <Td column="Edit">
                  <Link to={"/siteadmin/edit/staticpage/4"}>
                    Edit
                      </Link>
                </Td>
              </Tr>

              <Tr>
                <Td column={"ID"} >5</Td>
                <Td column={"Page Name"} >Help</Td>
                <Td column={"Preview"}>
                  <a href={"/help"} target={'_blank'}>
                    Preview
                        </a>
                </Td>
                <Td column="Edit">
                  <Link to={"/siteadmin/edit/staticpage/5"}>
                    Edit
                      </Link>
                </Td>
              </Tr>

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

export default withStyles(s)(connect(mapState, mapDispatch)(StaticPageManagement));



