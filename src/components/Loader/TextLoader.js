import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.css';

class TextLoader extends React.Component {

    static propTypes = {
        loadingText: PropTypes.string,
    };

    render() {
        const { loadingText, loadingTextSize } = this.props;
        return (
            <div className={s.textCenter}>
                <p className={s.saving}>
                    <span>{loadingText}</span>
                    <span className={s.savingDots}>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                </p>
            </div>
        );
    }
}

export default withStyles(s)(TextLoader);