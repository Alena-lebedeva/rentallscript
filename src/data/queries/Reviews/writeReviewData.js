// GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import sequelize from '../../sequelize';
import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation } from '../../models';

const writeReviewData = {

    type: ReservationType,

    args: {
        reservationId: { type: new NonNull(IntType) },
    },

    async resolve({ request, response }, { reservationId }) {
        if (request.user) {
            const userId = request.user.id;
            return await Reservation.findOne({
                where: {
                    reservationState: 'completed',
                    $or: [
                        {
                            hostId: userId
                        },
                        {
                            guestId: userId
                        }
                    ],
                    $and: [
                        {
                            id: reservationId,
                        },
                        {
                            id: {
                                $notIn: [
                                    sequelize.literal(`SELECT reservationId FROM Reviews WHERE authorId='${userId}'`)
                                ]
                            }
                        }
                    ]
                },
            });
        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default writeReviewData;

/**
query WriteReviewData($reservationdId: Int!){
  writeReviewData(reservationId: $reservationId){
    id
    listId
    hostData {
      userId
      profileId
      firstName
      lastName
      picture
      userData {
        email
      }
    }
    guestData {
      userId
      profileId
      firstName
      lastName
      picture
      userData {
        email
      }
    }
  }
}
**/