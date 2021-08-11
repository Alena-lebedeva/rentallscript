var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { WishList, Listing } from '../../data/models';

const updateListStatus = app => {

    new CronJob('0 0 * * * *', async function () {
        console.log('holy moly listing status');
        // get all reservation id
        const getListIds = await Listing.findAll({
            attributes: ['id', 'isPublished']
        });

        // Update Reservation Status to completed
        if (getListIds != null && getListIds.length > 0) {
            getListIds.map(async (item) => {
                // Get ThreadId
                let updateListingStatus = await WishList.update({
                    isListActive: item.isPublished
                }, {
                        where: {
                            listId: item.id
                        }
                    });
            })
        }

    }, null, true, 'America/Los_Angeles');

};

export default updateListStatus;