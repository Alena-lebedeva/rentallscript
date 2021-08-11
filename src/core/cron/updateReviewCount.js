var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { Reviews, Listing } from '../../data/models';

const updateReviewCount = app => {

  new CronJob('0 0 * * * *', async function () {
    console.log('holy moly update review count in listing');
    // get all reservation id
    const getListIds = await Listing.findAll({
      attributes: ['id', 'userId']
    });

    // Update Reservation Status to completed
    if (getListIds != null && getListIds.length > 0) {
      await Promise.all(getListIds.map(async (item) => {
        // Get reviews count
        let reviewsCountArray = [];
        let reviewsCount = await Reviews.count({
          where: {
            listId: item.id,
            userId: item.userId,
            isAdminEnable: true
          }
        });

        let reviewsStarRating = await Reviews.sum('rating', {
          where: {
            listId: item.id,
            userId: item.userId,
            isAdminEnable: true
          }
        });

        if (reviewsStarRating > 0 && reviewsCount > 0) {
          reviewsCountArray.push({
            'listId': item.id,
            'reviewsCount': Number(reviewsStarRating / reviewsCount)
          })
        } else {
          reviewsCountArray.push({
            'listId': item.id,
            'reviewsCount': 0
          })
        }

        reviewsCountArray && reviewsCountArray.map((item, key) => {
          let updateReservation = Listing.update({
            reviewsCount: item.reviewsCount
          }, {
              where: {
                id: item.listId,
              }
            });

        })
      }))
    }

  }, null, true, 'America/Los_Angeles');

};

export default updateReviewCount;