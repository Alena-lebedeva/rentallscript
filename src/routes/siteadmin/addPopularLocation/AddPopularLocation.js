import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddPopularLocation.css';

// Component
import AddPopularLocationManagement from '../../../components/siteadmin/AddPopularLocation/AddPopularLocationManagement';

class PopularLocation extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading }, title } = this.props;

        return (
            <AddPopularLocationManagement
                title={title}
            />
        );
    }
}

export default compose(
    withStyles(s),
)(PopularLocation);