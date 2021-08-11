import { ListCalendar, ListBlockedDates } from '../../data/models';

export async function findURL(url, listId) {
	const findURL = await ListCalendar.findOne({
		where: {
			listId,
			url
		}
	});
	if (findURL) {
		return true;
	} else {
		return false;
	}
}

export async function storeCalendar(url, listId, name) {
	return await ListCalendar.create({
		listId,
		name,
		url,
	});
}

export async function getCalendarData() {
	return await ListCalendar.findAll();
}

export async function blockDates(listId, calendarId, blockedDates) {
	return await ListBlockedDates.findOrCreate({
		where: {
			listId,
			blockedDates
		},
		defaults: {
			//properties you want on create
			listId,
			calendarId,
			blockedDates,
			calendarStatus: 'blocked'
		}
	});
}

export async function removeBlockedDates(listId, calendarId) {
	await ListBlockedDates.destroy({
		where: {
			listId,
			calendarId
		}
	});
}
