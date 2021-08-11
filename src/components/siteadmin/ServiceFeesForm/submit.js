import { updateServiceFees } from '../../../actions/ServiceFees/updateServiceFees';

async function submit(values, dispatch) {

	dispatch(
		updateServiceFees(
			values.guestType,
			values.guestValue,
			values.hostType,
			values.hostValue,
			values.currency
		)
	);
}

export default submit;
