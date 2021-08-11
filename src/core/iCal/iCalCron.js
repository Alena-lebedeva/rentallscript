var CronJob = require('cron').CronJob;
var ical = require('ical');
var request = require('request');
import { blockDates, getCalendarData, removeBlockedDates } from './dbFunctions';
import { getDates } from '../../helpers/dateRange';

const iCalCron = app => {

    new CronJob('0 0 0 * * *', async function () {
        var calendarData = await getCalendarData();
        const toSearch = "text/calendar";
        calendarData.map((item) => {
            request({ url: item.url, headers: { accept: '*/*' } }, async function (error, response, body) {
                if (!error) {
                    var contentType = response.headers['content-type'];
                    var dataIndex = contentType.search(toSearch);
                    if (dataIndex > -1) {
                        await removeBlockedDates(item.listId, item.id);
                        var data = ical.parseICS(body);
                        for (var k in data) {
                            if (data.hasOwnProperty(k)) {
                                var ev = data[k];
                                if (ev.start && ev.end) {
                                    if (ev.start.getDate() === ev.end.getDate()) {
                                        await blockDates(item.listId, item.id, ev.start);
                                    } else {
                                        var range = getDates(ev.start, ev.end);
                                        range.map(async (day) => {
                                            await blockDates(item.listId, item.id, day);
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            });
        });
    }, null, true, 'America/Los_Angeles');

};

export default iCalCron;