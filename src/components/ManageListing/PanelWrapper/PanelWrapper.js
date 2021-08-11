import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Component
import PanelItem from '../PanelItem';
import NoItem from '../NoItem';

// Locale
import messages from '../../../locale/messages';

class PanelWrapper extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        formatMessage: PropTypes.any,
    };

    render() {
        const { data } = this.props;
        const inProgressTitle = <h3><FormattedMessage {...messages.panelHeader1} /></h3>;
        const completedTitle = <h3><FormattedMessage {...messages.panelHeader2} /></h3>;
        let inProgressItems = [];
        let completedItems = [];

        if (data.length > 0) {
            data.map((item) => {
                let listPhotos = item.listPhotos;

                if (item.isReady) {
                    completedItems.push(item);
                } else {
                    inProgressItems.push(item);
                }
            });
            return (
                <div>
                    {
                        inProgressItems.length > 0 && <PanelItem panelTitle={inProgressTitle} data={inProgressItems} />
                    }

                    {
                        completedItems.length > 0 && <PanelItem panelTitle={completedTitle} data={completedItems} />
                    }
                </div>
            );
        } else {
            return <NoItem />;
        }

    }
}

export default PanelWrapper;
