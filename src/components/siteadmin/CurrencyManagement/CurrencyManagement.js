import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CurrencyManagement.css';

// Redux Actions
import { updateCurrencyStatus, setBaseCurrency } from '../../../actions/siteadmin/CurrencyManagement/currencyManagement';
import { managePaymentCurrency } from '../../../actions/siteadmin/CurrencyManagement/managePaymentCurrency';

class CurrencyManagement extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired,
      isBaseCurrency: PropTypes.bool.isRequired
    })),
    updateCurrencyStatus: PropTypes.any.isRequired,
    setBaseCurrency: PropTypes.any.isRequired,
    managePaymentCurrency: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    data: []
  };

  handleUpdateStatus(id, status) {
    const { updateCurrencyStatus } = this.props;
    updateCurrencyStatus(id, status);
  }

  handleBaseCurrency(id) {
    const { setBaseCurrency } = this.props;
    setBaseCurrency(id);
  }

  render() {
    const { data, title, managePaymentCurrency } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
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
                      <Td column={"Symbol"} data={value.symbol} />
                      <Td column={"Base Currency"} data={value.isBaseCurrency === true ? "Active" : ""} />
                      <Td column={"Status"}>
                        <span>
                          {
                            value.isEnable && <span> Enabled </span>
                          }
                          {
                            !value.isEnable && <span> Disabled </span>
                          }
                        </span>
                      </Td>

                      <Td column={"Set Enable / Disable"}>
                        <a href="javascript:void(0)" onClick={() => this.handleUpdateStatus(value.id, value.isEnable)} >
                          {
                            value.isEnable && <span> Disable </span>
                          }

                          {
                            !value.isEnable && <span> Enable </span>
                          }
                        </a>
                      </Td>
                      <Td column={"Set Base Currency"}>
                        <span>
                          {
                            !value.isBaseCurrency && value.isEnable && <a href="javascript:void(0)" onClick={() => this.handleBaseCurrency(value.id)}>
                              Set as base currency
                              </a>
                          }
                        </span>
                      </Td>

                      <Td column={"Allowed Payment Currency"}>
                        <span>
                          {
                            !value.isPayment && value.isEnable && <a href="javascript:void(0)" onClick={() => managePaymentCurrency(value.id, "add")}>
                              Add
                              </a>
                          }
                          {
                            value.isPayment && value.isEnable && <a href="javascript:void(0)" onClick={() => managePaymentCurrency(value.id, "remove")}>
                              Remove
                              </a>
                          }
                        </span>
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
  updateCurrencyStatus,
  setBaseCurrency,
  managePaymentCurrency
};

export default withStyles(s)(connect(mapState, mapDispatch)(CurrencyManagement));

