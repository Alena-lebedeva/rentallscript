import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';
import { FormControl } from 'react-bootstrap';

// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MessageManagement.css';

// Locale
import messages from '../../../locale/messages';
import messageManagementQuery from './messageManagement.graphql';
import CustomPagination from '../../CustomPagination';

class MessageManagement extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            reservationState: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                title: PropTypes.string.isRequired
            }),
            hostData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            hostPayout: PropTypes.shape({
                id: PropTypes.number.isRequired,
                payEmail: PropTypes.string.isRequired
            }),
            hostTransaction: PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
            guestData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            transaction: PropTypes.shape({
                payerEmail: PropTypes.string.isRequired,
                paymentType: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
        })),
        viewReceiptAdmin: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: []
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
        const { messageManagement: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    handleClick(searchList) {
        const { messageManagement: { refetch } } = this.props;
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



    render() {
        const { data, title, viewReceiptAdmin } = this.props;
        const { messageManagement: { loading, messageManagement } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;
        let userType = 'host';

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
                        <Table className="table"
                            noDataText="No matching records found."
                            // filterable={['Host Email Id', 'Guest  Email Id', 'Host', 'Guest']}
                            sortable={true}>
                            {
                                messageManagement && messageManagement.usersData && messageManagement.usersData.length > 0 && messageManagement.usersData.map(function (value, index) {
                                    return (
                                        <Tr key={index}>
                                            <Td column={"List Title"}>
                                                <a
                                                    target="_blank"
                                                    href={"/rooms/" + value.listId}
                                                    className={cx(s.previewLink)}
                                                >
                                                    {
                                                        value.listData ? value.listData.title : 'List is missing'
                                                    }
                                                </a>
                                            </Td>
                                            {
                                                value.hostProfile && value.hostProfile.displayName &&
                                                <Td column={"Host"}>
                                                    {value.hostProfile.displayName}
                                                </Td>
                                            }
                                            {
                                                value.hostUserData && value.hostUserData.email && <Td
                                                    column={"Host Email ID"} >
                                                    <a href={"/users/show/" + value.hostProfile.profileId} target="_blank" >
                                                        {value.hostUserData.email}
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.guestProfile && value.guestProfile.displayName &&
                                                <Td
                                                    column={"Guest"}
                                                    data={value.guestProfile.displayName}
                                                >
                                                </Td>
                                            }


                                            {
                                                value.guestUserData && value.guestUserData.email &&
                                                <Td
                                                    column={"Guest  Email ID"}
                                                >
                                                    <a href={"/users/show/" + value.guestProfile.profileId} target="_blank" >
                                                        {value.guestUserData.email}
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.id && value.id && <Td column={"Message History"}>
                                                    <a
                                                        target="_blank"
                                                        href={"/message/" + value.id + "/" + userType}
                                                        className={cx(s.previewLink)}
                                                    >
                                                        <FormattedMessage {...messages.messageHistroyLabel} />
                                                    </a>
                                                </Td>
                                            }
                                        </Tr>
                                    )
                                })
                            }
                        </Table>
                        {
                            messageManagement && messageManagement.usersData && messageManagement.usersData.length > 0
                            && <div>
                                <CustomPagination
                                    total={messageManagement.count}
                                    currentPage={currentPage}
                                    defaultCurrent={1}
                                    defaultPageSize={10}
                                    change={this.paginationData}
                                    paginationLabel={'Messages'}
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
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});

const mapDispatch = {
    viewReceiptAdmin,
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(messageManagementQuery, {
        name: 'messageManagement',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(MessageManagement);
// export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MessageManagement)));



