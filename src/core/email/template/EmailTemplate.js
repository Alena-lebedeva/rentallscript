import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConfirmEmail from './ConfirmEmail';
import BookingRequestHost from './BookingRequestHost';
import BookingConfirmationHost from './BookingConfirmationHost';
import BookingConfirmationGuest from './BookingConfirmationGuest';
import BookingDeclinedGuest from './BookingDeclinedGuest';
import BookingRequestGuest from './BookingRequestGuest';
import BookingExpiredGuest from './BookingExpiredGuest';
import BookingExpiredHost from './BookingExpiredHost';
import CancelledByHost from './CancelledByHost';
import CancelledByGuest from './CancelledByGuest';
import CompletedReservationGuest from './CompletedReservationGuest';
import CompletedReservationHost from './CompletedReservationHost';
import ForgotPasswordEmail from './ForgotPasswordEmail';
import NewMessage from './NewMessage';
import NewInquiry from './NewInquiry';
import ConfirmDocumentVerification from './ConfirmDocumentVerification';
import ContactEmail from './ContactEmail';
import ReportUserMail from './ReportUserMail';
import BookingPreApproval from './BookingPreApproval';
import BanStatusServiceStatusBanned from './BanStatusServiceStatusBanned';
import BanStatusServiceStatusUnBanned from './BanStatusServiceStatusUnBanned';
import ContactSupport from './ContactSupport';
import FeedbackMail from './FeedbackMail';

class EmailTemplate extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired
    };

    render() {
        const { type, content } = this.props;

        return (
            <div>
                {
                    type === 'welcomeEmail' && <ConfirmEmail content={content} />
                }
                {
                    type === 'confirmEmail' && <ConfirmEmail content={content} />
                }
                {
                    type === 'bookingRequest' && <BookingRequestHost content={content} />
                }
                {
                    type === 'bookingRequestGuest' && <BookingRequestGuest content={content} />
                }
                {
                    type === 'bookingConfirmedToHost' && <BookingConfirmationHost content={content} />
                }
                {
                    type === 'bookingConfirmedToGuest' && <BookingConfirmationGuest content={content} />
                }
                {
                    type === 'bookingDeclinedToGuest' && <BookingDeclinedGuest content={content} />
                }
                {
                    type === 'bookingExpiredGuest' && <BookingExpiredGuest content={content} />
                }
                {
                    type === 'bookingExpiredHost' && <BookingExpiredHost content={content} />
                }
                {
                    type === 'cancelledByHost' && <CancelledByHost content={content} />
                }
                {
                    type === 'cancelledByGuest' && <CancelledByGuest content={content} />
                }
                {
                    type === 'completedGuest' && <CompletedReservationGuest content={content} />
                }
                {
                    type === 'completedHost' && <CompletedReservationHost content={content} />
                }
                {
                    type === 'forgotPasswordLink' && <ForgotPasswordEmail content={content} />
                }
                {
                    type === 'message' && <NewMessage content={content} />
                }
                {
                    type === 'inquiry' && <NewInquiry content={content} />
                }
                {
                    type === 'documentVerification' && <ConfirmDocumentVerification content={content} />
                }
                {
                    type === 'contact' && <ContactEmail content={content} />
                }
                {
                    type === 'reportUser' && <ReportUserMail content={content} />
                }
                {
                    type === 'bookingPreApproval' && <BookingPreApproval content={content} />
                }
                {
                    type === 'banStatusServiceStatusBanned' && <BanStatusServiceStatusBanned content={content} />
                }
                {
                    type === 'banStatusServiceStatusUnBanned' && <BanStatusServiceStatusUnBanned content={content} />
                }
                {
                    type === 'contactSupport' && <ContactSupport content={content} />
                }
                {
                    type === 'userFeedback' && <FeedbackMail content={content} />
                }
            </div>
        );
    }
}

export default EmailTemplate;
