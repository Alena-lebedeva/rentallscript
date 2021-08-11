import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';
import {
    FormControl
} from 'react-bootstrap';

// Locale
import messages from '../../locale/messages';
import { get } from 'https';
import { connect } from 'react-redux';
import { change } from 'redux-form';

class CountryList extends Component {

    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            getCountries: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                countryCode: PropTypes.string.isRequired,
                countryName: PropTypes.string.isRequired,
                isEnable: PropTypes.bool.isRequired
            }).isRequired)
        }).isRequired,
        isEmptyFirst: PropTypes.bool,
        formatMessage: PropTypes.any
    };

    static defaultProps = {
        data: {
            getCountries: []
        },
        isEmptyFirst: false,
        dialCode: false
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(e, input) {
        const { data: { loading, getCountries }, dialCode, getSelected, change, formName } = this.props;

        let selectedItem = null;
        let currentValue = e.target.value;

        if (!loading && getCountries) {
            if (dialCode) {
                selectedItem = getCountries.find(o => o.dialCode == currentValue);
            } else {
                selectedItem = getCountries.find(o => o.countryCode == currentValue);
            }
        }

        if (getSelected) {
            getSelected(e, selectedItem);
            if (formName === 'EditProfileForm') {
                await change(formName, 'phoneCountryCode', selectedItem.countryCode);
                await change(formName, 'phoneDialCode', selectedItem.dialCode);
            }
        }

        return e;
    }

    render() {
        const { data: { loading, getCountries }, className, input, isEmptyFirst, dialCode, onChange } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <FormControl componentClass="select"
                    className={className}
                    {...input}
                    onChange={(e) => {
                        input.onChange(e);
                        this.handleChange(e, input);
                    }}
                >
                    {
                        loading && <option>{formatMessage(messages.country)}</option>
                    }

                    {
                        !loading && isEmptyFirst && <option value="">{formatMessage(messages.chooseCountry)}</option>
                    }

                    {
                        !loading && getCountries != null && getCountries.length > 0 && !dialCode && getCountries.map((item) => {
                            return (
                                <option value={item.countryCode} key={item.id}>{item.countryName}</option>
                            )
                        })
                    }
                    {
                        !loading && getCountries != null && getCountries.length > 0 && dialCode && getCountries.map((item) => {
                            return (
                                <option value={item.dialCode} key={item.id}>{item.countryName}</option>
                            )
                        })
                    }
                </FormControl>
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    change
};

export default compose(
    injectIntl,
    connect(mapState, mapDispatch),
    graphql(gql`
    query getCountries {
        getCountries{
            id
            countryCode
            countryName
            isEnable
            dialCode
        }
    }
`, { options: { ssr: false } })
)(CountryList);
