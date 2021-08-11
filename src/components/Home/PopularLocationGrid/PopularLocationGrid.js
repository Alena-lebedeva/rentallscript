import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationGrid.css';
import {
    Grid,
    Row
} from 'react-bootstrap';
import cx from 'classnames';

// Locale
import Loader from '../../Loader/Loader';
import PopularLocationGridItem from '../PopularLocationGridItem';

class PopularLocationGrid extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
    };

    render() {
        const { loading, data } = this.props;
        if (loading) {
            return <Loader type={"text"} />
        } else {
            return (
                <Grid fluid>
                    <Row className={cx(s.GridCollapse)}>
                        {
                            data && data.length > 0 && data.map((item, index) => {
                                if (item.isEnable == 'true') {
                                    let path = index == 2 ? '/images/popularLocation/' + item.image : '/images/popularLocation/small_' + item.image;
                                    return <PopularLocationGridItem id={item.id} location={item.location} image={item.image} locationAddress={item.locationAddress} key={index} path={path} />;
                                }
                            })
                        }
                    </Row>
                </Grid>
            );
        }
    }
}

export default withStyles(s)(PopularLocationGrid);
