import { Listing, ListBlockedDates } from '../../../data/models';

export async function isListExist(listId) {
	return await Listing.findOne({
		where: {
			id: listId,
			isPublished: 1
		}
	});
}

export async function getBlockedDates(listId) {
	const blockedDates = await ListBlockedDates.findAll({
		where: {
			listId,
			calendarId: {
				$eq: null
			},
			calendarStatus: {
				$notIn: ['available']
			}
		},
		order: [
			['blockedDates', 'ASC']
		]
	});
	var dates = [];
	blockedDates.map((item) => {
		dates.push(item.blockedDates);
	});
	return dates;
}