import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { Panel } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PanelItem.css';

// Component
import ListItem from '../ListItem';

class PanelItem extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        panelTitle: PropTypes.object.isRequired
    };

    render() {
        const { data, panelTitle } = this.props;

        return (
            <Panel className={s.panelHeader} header={panelTitle}>
                <ul className={s.listContainer}>
                    {
                        data.map((item, index) => {
                            return (
                                <ListItem data={item} key={index} />
                            )
                        })
                    }
                </ul>
            </Panel>
        )
    }
}

export default withStyles(s)(PanelItem);
