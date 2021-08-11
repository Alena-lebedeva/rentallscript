var csv = require('csv-express')
import {
	completedTransactions,
	futureTransactions,
	grossEarnings
} from './getTransactionsData';

import {
	users,
	reservations,
	listings
} from './adminData';

const csvRoutes = app => {

	app.get('/export-transaction', async function (req, res) {
		if (!req.user) {
			res.redirect('/');
		} else {
			var type = req.query.type;
			var userId = req.query.userId;
			var base = req.query.base;
			var toCurrency = req.query.toCurrency;
			let data = [];
			if (userId && userId === req.user.id) {
				if (type === 'completed') {
					data = await completedTransactions(userId, base, toCurrency);
				} else if (type === 'future') {
					data = await futureTransactions(userId, base, toCurrency);
				} else if (type === 'grossEarnings') {
					data = await grossEarnings(userId, base, toCurrency);
				}
			}
			res.setHeader('Content-disposition', 'attachment; filename=' + type + '-transactions.csv');
			res.set('Content-Type', 'text/csv');
			res.csv(data, true);
		}
	})

	app.get('/export-admin-data', async function (req, res) {
		var type = req.query.type;
		let userType = req.query.usertype
		let keyword = req.query.keyword
		if (req.user && req.user.admin && type) {
			let data = [];
			if (type === 'users') {
				data = await users(keyword, userType);
			} else if (type === 'listings') {
				data = await listings();
			} else if (type === 'reservations') {
				data = await reservations();
			}
			res.setHeader('Content-disposition', 'attachment; filename=' + type + '-data.csv');
			res.set('Content-Type', 'text/csv');
			res.csv(data, true);
		} else {
			res.redirect('/');
		}
	})
};

export default csvRoutes;