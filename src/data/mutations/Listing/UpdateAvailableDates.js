import ListCalendarPriceType from '../../types/ListCalendarPriceType';

import { ListCalendarPrice } from '../../models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';


const UpdateAvailableDates = {

    type: ListCalendarPriceType,

    args: {
        listId: { type: new NonNull(IntType) },
        blockedDates: { type: new List(StringType) },
        isSpecialPrice: { type: FloatType }
    },

    async resolve({ request }, { listId, blockedDates, isSpecialPrice }) {


        // Check whether user is logged in
        if (request.user || request.user.admin) {

            // Blocked Dates
            if (blockedDates) {
                // Collect all records of Blocked Dates except Reservation Dates
                const availableDatesData = await ListCalendarPrice.findAll({
                    where: {
                        listId
                    }
                });

                // Remove all the blocked dates except reservation dates
                const removeBlockedDates = await ListCalendarPrice.destroy({
                    where: {
                        listId
                    }
                });

                if (blockedDates && blockedDates.length > 0) {
                    let availableDatesItems = [];
                    availableDatesData.map((item, key) => {
                        availableDatesItems[key] = new Date(item.blockedDates);
                    });

                    await Promise.all(blockedDates.map(async (item, key) => {
                        let day = new Date(item);
                        let blockedItem = availableDatesItems.map(Number).indexOf(+day);
                        if (blockedItem > -1) {
                            let blockedDatesFind = await ListCalendarPrice.findAll({
                                where: {
                                    listId,
                                    blockedDates: availableDatesData[blockedItem].blockedDates
                                }
                            });

                            if (blockedDatesFind) {
                                const updateDates = await ListCalendarPrice.update({
                                    blockedDates: availableDatesData[blockedItem].blockedDates,
                                    isSpecialPrice: isSpecialPrice
                                },
                                    {
                                        where: {
                                            listId,
                                            blockedDates: availableDatesData[blockedItem].blockedDates
                                        }
                                    })
                            }

                        }
                        else {
                            let createRecord = await ListCalendarPrice.findOrCreate({
                                where: {
                                    listId,
                                    blockedDates: item,
                                    isSpecialPrice: isSpecialPrice
                                },
                                defaults: {
                                    //properties you want on create
                                    listId,
                                    blockedDates: item,
                                    isSpecialPrice: isSpecialPrice
                                }
                            });
                        }
                    }));
                } else {
                    await Promise.all(blockedDates.map(async (item, key) => {
                        let updateAvailableDates = await ListCalendarPrice.findOrCreate({
                            where: {
                                listId,
                                blockedDates: item,
                                isSpecialPrice: isSpecialPrice
                            },
                            defaults: {
                                //properties you want on create
                                listId,
                                blockedDates: item,
                                isSpecialPrice: isSpecialPrice
                            }
                        });
                    }));
                }

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

export default UpdateAvailableDates;


/**
mutation($listId: Int!, $blockedDates: [String]) {
    UpdateAvailableDates (listId: $listId, blockedDates: $blockedDates) {
        status
    }
}
 */
