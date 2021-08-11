// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ShareModal.css';
import {
    Modal,
    Button
} from 'react-bootstrap';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';

<FormattedMessage {...messages.receipt} />

class ShareModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            title: '',
            description: ''
        };
    }
    render() {
        const { title, description } = this.props;
        return (

            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className={s.modalCustom} closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <div class={s.font20}>
                            <p>{title}
                            </p>
                        </div>
                        <div className={s.font16}>
                            <p>
                                {description}
                            </p>

                        </div>
                    </Modal.Body>
                </Modal>
                <Button variant="primary" onClick={() => this.setState({ modalShow: true, title: ' Airbnb host?', description: 'test' })}>
                    <FormattedMessage {...messages.Modal} />
                </Button>
            </div>
        );
    }
}




export default withStyles(s)(ShareModal);