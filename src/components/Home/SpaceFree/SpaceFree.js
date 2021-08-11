import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SpaceFree.css';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';
//local

import bannertwo from './banner.jpg';
import messages from '../../../locale/messages';
class SpaceFree extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render() {

        return (
            <div className={s.spaceFree}>
                <Grid>
                    <div >
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <div className={s.spaceLeft}>
                                    <div className={s.spaceBg} style={{ backgroundImage: `url(${bannertwo})` }}></div>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <div className={s.spaceRight}>
                                    <div className={s.spaceHeader}>
                                        <FormattedMessage {...messages.spaceFreeOne} />
                                    </div>
                                    <div className={s.spaceSmall}>
                                        <FormattedMessage {...messages.spaceFreeTwo} />
                                    </div>
                                    <div className={s.secFourbutt}>
                                        <button>
                                            <FormattedMessage {...messages.freeOutMore} />
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(SpaceFree);
