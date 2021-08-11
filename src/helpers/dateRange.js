import moment from 'moment';

export function getDates(startDate, stopDate) {
	var dateArray = [];
	var currentDate = moment(startDate);
	var stopDate = moment(stopDate);
	while (currentDate < stopDate) {
		dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
		currentDate = moment(currentDate).add(1, 'days');
	}
	return dateArray;
}

export function getRange(dates) {
	var startDate = null, endDate = null, counter = 0;
	var previousDate = null, datesCollection = [];
	if (dates.length > 0) {
		if (dates.length === 1) {
			datesCollection = [
				{
					startDate: dates[0],
					endDate: dates[0]
				}
			]
		} else {
			dates.map((item) => {
				var dateRange = {};
				var currentDate = moment(item);
				counter++;
				if (previousDate === null) {
					startDate = item;
				}
				if (previousDate != null) {
					var previousDateObject = moment(previousDate);
					var difference = currentDate.diff(previousDateObject, 'days');
					if (difference > 1) {
						endDate = new Date(new Date(previousDate).getTime() + 3600000);
						dateRange = {
							startDate,
							endDate
						};
						datesCollection.push(dateRange);
						startDate = item;
						if (counter === dates.length) {
							endDate = item;
							dateRange = {
								startDate,
								endDate
							};
							datesCollection.push(dateRange);
						}
					} else {
						if (counter === dates.length) {
							endDate = new Date(new Date(item).getTime() + 3600000);
							dateRange = {
								startDate,
								endDate
							};
							datesCollection.push(dateRange);
						}
					}
				}
				previousDate = item;
			});
		}
	}
	return datesCollection;
}