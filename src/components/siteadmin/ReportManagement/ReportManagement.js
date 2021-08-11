import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import moment from 'moment';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormControl } from 'react-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReportManagement.css';
import ReportManagementQuery from './ReportManagement.graphql';
import CustomPagination from '../../CustomPagination';

class ReportManagement extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            reporterId: PropTypes.string.isRequired,
            reporterType: PropTypes.string.isRequired,
        })),
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
        // this.handleChange = this.handleChange.bind(this);
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    paginationData(currentPage) {
        const { reportUserManagement: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    handleClick(searchList) {
        const { reportUserManagement: { refetch } } = this.props;
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
        const { data, title } = this.props;
        const { reportUserManagement: { loading, reportUserManagement } } = this.props;
        const { currentPage } = this.state;

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
                            sortable={true}
                        >
                            {
                                reportUserManagement && reportUserManagement.reportsData.length > 0 && reportUserManagement.reportsData.map(function (value, index) {
                                    let date = moment(value.createdAt).format('MM/DD/YYYY');
                                    return (
                                        <Tr key={index}>
                                            <Td column={"ID"}>
                                                {value.id}
                                            </Td>
                                            {
                                                value.reporterData && value.reporterData.displayName &&
                                                <Td column={"Reporter Name"}>
                                                    {value.reporterData.displayName}
                                                </Td>

                                            }
                                            {
                                                value.reporterData === null &&
                                                <Td column={"Reporter Name"}>
                                                    User Deleted
                                                    </Td>
                                            }
                                            {
                                                value.reporterData && value.reporterEmail.email &&
                                                <Td column={"Reporter Email"}>
                                                    <a
                                                        //href={"/users/show/" + value.userData.profileId} 
                                                        href={"/users/show/" + value.userProfileId.profileId}
                                                        target="_blank"
                                                    >
                                                        {value.reporterEmail.email}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                value.reporterData === null && <Td column={"Reporter Email"}>
                                                    User Deleted
                                                    </Td>
                                            }
                                            {
                                                value.userData && value.userData.displayName &&
                                                <Td column={"User Name"} data={value.userData.displayName} />
                                            }
                                            {
                                                value.userData === null && <Td column={"User Name"}>
                                                    User Deleted
                                                    </Td>
                                            }
                                            {
                                                value.userData && value.userEmail.email &&
                                                <Td column={"User Email"}>
                                                    <a
                                                        //href={"/users/show/" + value.userProfileId.profileId} 
                                                        href={"/users/show/" + value.userData.profileId}
                                                        target="_blank"
                                                    >
                                                        {value.userEmail.email}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                value.userData === null
                                                && <Td column={"User Email"}>
                                                    User Deleted
                                                    </Td>
                                            }
                                            {
                                                value.reportType &&
                                                <Td
                                                    column={"Report Type"}
                                                    data={value.reportType}
                                                >
                                                </Td>
                                            }
                                            {
                                                value && <Td column={"Date"}>
                                                    {date}
                                                </Td>
                                            }
                                        </Tr>
                                    )
                                })
                            }
                        </Table>
                        {
                            reportUserManagement && reportUserManagement.reportsData && reportUserManagement.reportsData.length > 0
                            && <div>
                                <CustomPagination
                                    total={reportUserManagement.count}
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
});

const mapDispatch = {
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(ReportManagementQuery, {
        name: 'reportUserManagement',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(ReportManagement);
// export default withStyles(s)(connect(mapState, mapDispatch)(ReportManagement));



