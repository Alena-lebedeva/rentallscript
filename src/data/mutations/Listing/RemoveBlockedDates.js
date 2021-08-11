import ListBlockedDatesType from '../../types/ListBlockedDatesType';

import { ListBlockedDates } from '../../models';
import moment from 'moment';
import sequelize from 'sequelize';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType
} from 'graphql';

const RemoveBlockedDates = {

    type: ListBlockedDatesType,

    args: {
        listId: { type: new NonNull(IntType) },
        blockedDates: { type: new List(StringType) },
    },

    async resolve({ request }, { listId, blockedDates }) {

        // Check whether user is logged in
        if (request.user || request.user.admin) {
            // let blockedDatesData;
            // Collect all records of Blocked Dates except Reservation Dates

            await Promise.all(blockedDates.map(async (item, index) => {
                let day = moment.utc(item).format('YYYY-MM-DD');
                let dayList = sequelize.where(sequelize.fn('DATE', sequelize.col('blockedDates')), day);

                let blockedDatesFind = await ListBlockedDates.findAll({
                    //attributes: ['id', 'blockedDates'],
                    where: {
                        blockedDates: dayList,
                        listId: listId,
                        reservationId: {
                            $eq: null
                        },
                    }
                })

                let blockedDatesData = await ListBlockedDates.destroy({
                    where: {
                        listId,
                        reservationId: {
                            $eq: null
                        },
                        blockedDates: dayList
                    }
                });

                if (blockedDatesData) {
                    return {
                        status: '200'
                    }
                } else {
                    return {
                        status: '400'
                    }
                }

            }));

        } else {
            return {
                status: "Not loggedIn"
            };
        }
    },
};

export default RemoveBlockedDates;
