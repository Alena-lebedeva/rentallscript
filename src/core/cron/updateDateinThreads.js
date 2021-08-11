var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { Threads } from '../../data/models';
import moment from 'moment';

const updateDateinThreads = app => {

	// new CronJob('1 1 18 * * *', async function () {
	new CronJob('0 */30 * * * *', async function () {
		console.log('holy moly convert updatedAt');
		// get all dates
		const getDates = await Threads.findAll({
			attributes: ['id', 'updatedAt'],
			where: {
				messageUpdatedDate: null
			}
		});

		//update dates
		if (getDates != null && getDates.length > 0) {
			getDates.map(async (item) => {
				let newDate = moment(item.updatedAt, "Do MMMM YYYY").format('YYYY-MM-DD');

				await Threads.update({
					messageUpdatedDate: newDate
				}, {
						where: {
							id: item.id
						}
					});
			})
		}

	}, null, true, 'Europe/London');

};

export default updateDateinThreads;