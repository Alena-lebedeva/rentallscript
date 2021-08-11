import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import PanelItem from '../PanelItem';
import { graphql, gql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PanelWrapper.css';


// Locale
import messages from '../../../../locale/messages';

import ManageListingsQuery from './ManageListingsProfile.graphql';

import ListItem from '../../../SearchListing/ListingItem/ListingItem';
import SearchResults from '../../../SearchListing/SearchResults/SearchResults';
import cx from 'classnames';
import {
    Button,
    Row,
    Col,
    ProgressBar,
    Carousel
} from 'react-bootstrap';
import ListSlider from '../../ListSlider';

class PanelWrapper extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        formatMessage: PropTypes.any,
    };
    static defaultProps = {
        ManageListingsData: {
            ManageListingsProfile: [],
            loading: true
        }
    }

    constructor(props) {
        super(props);     
    }

    render () {
        const { userId } = this.props;
        const { ManageListingsData: { loading, ManageListingsProfile } } = this.props;
        const { formatMessage } = this.props.intl;
        const completedTitle = <h3>
            <FormattedMessage {...messages.myHostSpaces} />
        </h3>;
        let completedItems = [];

        return (
            <div
                className={cx(s.pageContainer, s.space2, s.spaceTop4, 'ViewProfile')}
            >
                <Col md={12} lg={12} sm={12} xs={12} className={cx(s.space4,s.smPadding)}>
                    {
                        !loading && <ListSlider 
                            data={ManageListingsProfile}
                            panelTitle={completedTitle}
                                        
                        />
                    }
                </Col>
            </div>
        );

    }
}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(ManageListingsQuery, {
        name: 'ManageListingsData',
        options: (props) => ({
            variables: {
                userId: props.userId,
            },
            fetchPolicy: 'network-only',
        })
    }),
)(PanelWrapper);