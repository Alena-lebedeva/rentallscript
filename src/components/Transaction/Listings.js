import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
// Locale
import messages from '../../locale/messages';
import { onChangeListing } from '../../actions/Listing/onChangeListing';

import { FormControl } from 'react-bootstrap';
class Listings extends Component {
    static propTypes = {
        className: PropTypes.string,
        formatMessage: PropTypes.any,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            ManageListings: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired
            }))
        }),
        refetch: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { refetch } = this.props;
        const { onChangeListing } = this.props;
        const { mode, handleResults, payoutId } = this.props;
        let variables = {
            listId: e.target.value
        };
        onChangeListing(e.target.value);
        //refetch(variables);
        handleResults(mode, payoutId, e.target.value);
    }

    render() {
        const { className, data: { loading, ManageListingTransaction } } = this.props;
        const { formatMessage } = this.props.intl;
        const { onChangeListingId } = this.props;
        return (
            <FormControl componentClass="select" className={className} onChange={this.handleChange} value={onChangeListingId}>
                <option value="0">{formatMessage(messages.allListings)}</option>
                {
                    !loading && ManageListingTransaction && ManageListingTransaction.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>{item.title}</option>
                        )
                    })

                }
            </FormControl>
        );
    }
}
const mapState = (state) => ({
    onChangeListingId: state.onChangeListing.onChangeListingId
});

const mapDispatch = {
    onChangeListing
};

export default compose(
    connect(mapState, mapDispatch),
    injectIntl,
    graphql(gql`
    	{
		    ManageListingTransaction {
		        id
                title
                isReady
            }
		}
    `,
        {
            options: {
                ssr: false
            }
        }),
)(Listings);
