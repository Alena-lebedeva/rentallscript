var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { ListBlockedDates, ListingData } from '../../data/models';

const calendarPriceUpdate = app => {

    new CronJob('0 */30 * * * *', async function () {
        console.log('holy moly expire reservation');
        // get all reservation id
        const getListBlockedDates = await ListBlockedDates.findAll({
            attributes: ['id', 'listId', 'calendarStatus', 'isSpecialPrice'],
            having: {
                calendarStatus: 'available',
                isSpecialPrice: null
            }
        });

        //Store them in an array
        if (getListBlockedDates != null && getListBlockedDates.length > 0) {
            getListBlockedDates.map(async (item) => {


                const getListingData = await ListingData.findAll({
                    where: {
                        listId: item.listId
                    }
                });

                getListingData && getListingData.length > 0 && getListingData.map(async (value, keys) => {


                    let updateReservation = await ListBlockedDates.update({
                        isSpecialPrice: value.basePrice
                    }, {
                            where: {
                                listId: value.listId
                            }
                        });

                })
            })
        }

    }, null, true, 'America/Los_Angeles');

};

export default calendarPriceUpdate;