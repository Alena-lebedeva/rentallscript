import AllReservationType from '../../types/AllReservationType';
import { Reservation } from '../../models';
// For sequelize functions
import sequelize from '../../sequelize';
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const getAllReservationAdmin = {

  type: AllReservationType,
  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType },
  },

  async resolve({ request }, { currentPage, searchList }) {
    if (request.user.admin) {
      let paymentState = 'completed';
      const limit = 10;
      let offset = 0;
      // Offset from Current Page
      if (currentPage) {
        offset = (currentPage - 1) * limit;
      }
      let reservationData, count, where;
      if (searchList) {
        where = {
          $or: [
            {
              confirmationCode: {
                $like: '%' + searchList + '%'
              }
            },
            {
              reservationState: {
                $like: '%' + searchList + '%'
              }
            },
            {
              listId: {
                $in: [
                  sequelize.literal(`
                  SELECT
                    id
                  FROM
                    Listing
                  WHERE title like '%${searchList}%'
                `)
                ]
              }
            }
          ],
          paymentState
        }
        count = await Reservation.count({
          where
        });
        reservationData = await Reservation.findAll({
          limit,
          offset,
          order: [['createdAt', 'DESC']],
          where
        });
      } else {
        reservationData = await Reservation.findAll({
          where: {
            paymentState
          },
          order: [['createdAt', 'DESC']],
          limit,
          offset
        });
        count = await Reservation.count({
          where: {
            paymentState
          }
        })
      }
      return {
        reservationData,
        count
      };
    } else {
      return {
        status: 'Not loggedin'
      };
    }
  }
};

export default getAllReservationAdmin;

/**

query getAllReservationAdmin{
  getAllReservationAdmin{
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
        total
    messageData {
      id
    }
    listData {
      id
      title
      street
      city
      state
      country
    }
    hostData {
      profileId
      displayName
      picture
    }
    guestData {
      profileId
      displayName
      picture
    }
    status
  }
}

**/