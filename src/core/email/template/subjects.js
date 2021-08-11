export function getSubject(type) {
	let subject, previewText;

	if (type === 'welcomeEmail' || type === 'confirmEmail') {
		subject = 'Please confirm your e-mail address';
		previewText = 'Action Required! Confirm your email';
	}
	if (type === 'bookingRequest') {
		subject = 'You have a new reservation';
		previewText = 'Great News! You have a new reservation';
	}
	if (type === 'bookingRequestGuest') {
		subject = 'Your reservation request sent to your host';
		previewText = 'Great News! Your reservation is shared with host';
	}
	if (type === 'bookingConfirmedToHost') {
		subject = 'You have confirmed a reservation';
		previewText = 'Confirmed Reservation Details';
	}
	if (type === 'bookingConfirmedToGuest') {
		subject = 'Your reservation is confirmed by your host';
		previewText = 'Pack your bag, you are ready for your trip!';
	}
	if (type === 'bookingDeclinedToGuest') {
		subject = 'Your reservation request is declined by your host';
		previewText = 'We are sorry, your request is declined';
	}
	if (type === 'bookingExpiredGuest') {
		subject = 'Your reservation request is expired';
		previewText = 'We are sorry, your request is expired';
	}
	if (type === 'bookingExpiredHost') {
		subject = 'Your reservation is expired';
		previewText = 'Your reservation is expired';
	}
	if (type === 'cancelledByHost') {
		subject = 'Your reservation is cancelled by host';
		previewText = 'Your reservation is cancelled';
	}
	if (type === 'cancelledByGuest') {
		subject = 'Your reservation is cancelled by guest';
		previewText = 'Your reservation is cancelled';
	}
	if (type === 'completedGuest') {
		subject = 'Please write a review for your host';
		previewText = 'Action Required! Write a Review';
	}
	if (type === 'completedHost') {
		subject = 'Please write a review for your guest';
		previewText = 'Action Required! Write a Review';
	}
	if (type === 'forgotPasswordLink') {
		subject = 'Reset your Password';
		previewText = 'Action Required! Reset your Password';
	}

	if (type === 'message') {
		subject = 'You have got a new message';
		previewText = 'Someone sent you a new message!';
	}

	if (type === 'inquiry') {
		subject = 'You have got a new inquiry';
		previewText = 'Someone sent you an inquiry from contact form!';
	}

	if (type === 'documentVerification') {
		subject = 'Documents verification status';
		previewText = 'Documents verification status';
	}
	if (type === 'contact') {
		subject = 'You got a customer support notification';
		previewText = 'You got a customer support notification';
	}
	if (type === 'reportUser') {
		subject = 'You got a notification for user violation';
		previewText = 'You got a notification for user violation. Reporting by someone.';
	}
	if (type === 'bookingPreApproval') {
		subject = 'Host pre-approved your request';
		previewText = 'Booking pre-approved';
	}

	if (type === 'banStatusServiceStatusBanned') {
		subject = 'Your account has been disabled';
		previewText = 'Your account has been disabled!';
	}
	if (type === 'banStatusServiceStatusUnBanned') {
		subject = 'Your account has been enabled';
		previewText = 'Your account has been enabled!';
	}
	if (type === 'contactSupport') {
		subject = 'Customer Support';
		previewText = 'Customer Support';
	}
	if (type === 'userFeedback') {
		subject = 'Customer Feedback';
		previewText = 'Customer Feedback';
	}

	return {
		subject,
		previewText
	};
}