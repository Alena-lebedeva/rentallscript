// General
import React, { Component } from 'react';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './BlogContent.css';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';
class BlogContent extends Component {
    render() {
        const { initialValues } = this.props;
        let addClass = 'ql-editor frontend';

        return (
            <Grid fluid className={s.root}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.space6)}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div>
                                {/* <h1 className={s.titleText}>{initialValues.pageTitle}</h1> */}
                            </div>
                            <div className={s.subText}>
                                <div
                                    className={addClass}
                                    dangerouslySetInnerHTML={{ __html: initialValues.content }}
                                >
                                </div>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withStyles(s)(BlogContent);
