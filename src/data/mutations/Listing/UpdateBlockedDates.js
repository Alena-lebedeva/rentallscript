import ListBlockedDatesType from '../../types/ListBlockedDatesType';

import { ListBlockedDates } from '../../models';
import moment from 'moment';
import sequelize from 'sequelize';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';

const UpdateBlockedDates = {

    type: ListBlockedDatesType,

    args: {
        listId: { type: new NonNull(IntType) },
        blockedDates: { type: new List(StringType) },
        calendarStatus: { type: StringType },
        isSpecialPrice: { type: FloatType }
    },

    async resolve({ request }, { listId, blockedDates, calendarStatus, isSpecialPrice }) {

        // Check whether user is logged in
        if (request.user || request.user.admin) {
            var blockedDatesCollection = [];
            var reservationDatesCollection = [];
            // Blocked Dates
            if (blockedDates) {
                // Collect all records of Blocked Dates except Reservation Dates
                const blockedDatesData = await ListBlockedDates.findAll({
                    where: {
                        listId,
                        reservationId: {
                            $eq: null
                        },
                        calendarId: {
                            $ne: null
                        },
                    }
                });

                let day;
                let itemValue;
                await Promise.all(blockedDates.map(async (item, key) => {
                    day = moment(item).format('YYYY-MM-DD');
                    //let blockedDatesFind =  sequelize.fn('DATE',sequelize.col('blockedDates'), day);

                    let dayList = sequelize.where(sequelize.fn('DATE', sequelize.col('blockedDates')), day);

                    let blockedDatesFind = await ListBlockedDates.findAll({
                        //attributes: ['id', 'blockedDates'],
                        where: {
                            blockedDates: dayList,
                            listId: listId
                        }
                    })

                    // let blockedDatesFind = await ListBlockedDates.findAll({
                    //     where: sequelize.where(sequelize.fn('DATE',
                    //         sequelize.col('blockedDates')), day)
                    // });

                    itemValue = item;
                    await Promise.all(blockedDatesFind.map(async (value, keys) => {
                      
                        if (itemValue === value.blockedDates) {

                        } else {
                            const updateDates = await ListBlockedDates.update({
                                listId,
                                blockedDates: value.blockedDates,
                                isSpecialPrice: isSpecialPrice,
                                calendarStatus: calendarStatus,
                            },
                                {
                                    where: {
                                        listId,
                                        blockedDates: value.blockedDates,
                                        reservationId: null
                                    }
                                });
                        }
                    }));

                    if (blockedDatesFind.length == 0) {
                        let updateBlockedDates = await ListBlockedDates.findOrCreate({
                            where: {
                                listId,
                                blockedDates: item,
                                calendarStatus: calendarStatus,
                                isSpecialPrice: isSpecialPrice,
                            },
                            defaults: {
                                //properties you want on create
                                listId,
                                //blockedDates: new Date(item),
                                blockedDates: item,
                                calendarStatus: calendarStatus,
                                isSpecialPrice: isSpecialPrice,
                            }
                        });
                    }

                }));

                return {
                    status: '200'
                };

            } else {
                return {
                    status: '500'
                };
            }
        }
    }
};

export default UpdateBlockedDates;


/**
mutation($listId: Int!, $blockedDates: [String]) {
    UpdateBlockedDates(listId: $listId, blockedDates: $blockedDates) {
        status
    }
}
 */
