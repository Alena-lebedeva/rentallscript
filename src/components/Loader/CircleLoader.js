import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

// Component
import MDSpinner from 'react-md-spinner';

import s from './Loader.css';

class CircleLoader extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired
    };

    static defaultProps = {
        show: false
    };

    render() {
        const { show } = this.props;

        if (!show) {
            return <div />;
        }

        return (
            <div className={s.textCenter}>
                <MDSpinner
                    singleColor={"#ff5a5f"}
                    size={48}
                />
            </div>
        );
    }
}

export default CircleLoader;
