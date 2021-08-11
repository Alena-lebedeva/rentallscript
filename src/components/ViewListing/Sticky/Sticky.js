import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sticky.css';
// Redux
import { connect } from 'react-redux';

// Redux Form
import { formValueSelector } from 'redux-form';

class Sticky extends React.Component {

    static defaultProps = {
        stickyTop: 412,
        stickyBottom: 1615,
        toppad: 0
    };

    componentWillReceiveProps(nextProps) {
        const { stickyTop, stickyBottom } = nextProps;
        let toppad = this.state;

        const { maximumStay, availability, startDate, endDate } = nextProps;

        let isValid = !maximumStay && availability && startDate != null && endDate != null;

        const setInitialHeight = (elements) => {
            [].forEach.call(elements, (sticky) => {
                sticky.setAttribute('data-sticky-width', sticky.getBoundingClientRect().width);
            });
        };

        const stickies = document.querySelectorAll('[data-sticky]');
        setInitialHeight(stickies);

        document.addEventListener('scroll', () => {
            let top = document.documentElement.scrollTop || document.body.scrollTop,
                bottom = document.documentElement.scrollHeight || document.body.scrollHeight,
                isWeb = (document.documentElement.clientWidth || document.body.clientWidth) >= 1200 ? true : false;

            let bookItsection = 605;
            if (isValid) {
                bookItsection = 805;
            }
            // if (document.querySelector('[data-sticky-section]')) {
            //     let bookItHeight = document.querySelector('[data-sticky-section]').getBoundingClientRect().height;
            //     bookItsection = (bookItHeight > 650) ? bookItHeight : 650;
            // }    

            [].forEach.call(stickies, (sticky) => {
                let stickyInitialWidth = parseFloat(sticky.getAttribute('data-sticky-width'), 10);
                if (top >= stickyTop && top <= stickyBottom && isWeb && document.querySelector('.bookItFormSection')) {
                    sticky.setAttribute('style', 'position: fixed; top: 10px; z-index: 3; width: 330px');
                    sticky.classList.add('sticky');
                    if (top > (stickyBottom - bookItsection - 50)) {
                        toppad = (stickyBottom - bookItsection - 50) - top;
                        sticky.setAttribute('style', 'position: fixed; top: ' + toppad + 'px; z-index: 1; width: 330px');

                    } else {
                        document.querySelector('.bookItFormSection').removeAttribute('style');
                    }
                } else {
                    sticky.removeAttribute('style');
                    sticky.classList.remove('sticky');
                }
                // let stickyInitialWidth = parseFloat(sticky.getAttribute('data-sticky-width'), 10);
                // if (top >= stickyTop && top <= (stickyBottom) && isWeb && document.querySelector('.bookItFormSection')) {
                //     sticky.setAttribute('style', 'position: fixed; top: 0px; z-index: 1; width: ' + stickyInitialWidth + 'px');
                //     sticky.classList.add('sticky');
                //     if (top > (stickyBottom - bookItsection)) {
                //         toppad = (stickyBottom - bookItsection) - top;
                //         sticky.setAttribute('style', 'position: fixed; top: ' +toppad+'px; z-index: 1; width: ' + stickyInitialWidth + 'px');
                //     } else {
                //         document.querySelector('.bookItFormSection').removeAttribute('style');
                //     }
                // } else {
                //    sticky.removeAttribute('style');
                //     sticky.classList.remove('sticky');
                // }
            });
        });

    }

    render() {
        const { children, exitOn } = this.props;

        return (
            <div data-sticky>
                {this.props.children}
            </div>
        );
    };
}

const selector = formValueSelector('BookingForm');

const mapState = (state) => ({
    stickyTop: state.sticky.stickyTop,
    stickyBottom: state.sticky.stickyBottom,
    availability: state.viewListing.availability,
    maximumStay: state.viewListing.maximumStay,
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate'),
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(Sticky));