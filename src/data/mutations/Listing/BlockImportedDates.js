import ListBlockedDatesType from '../../types/ListBlockedDatesType';

import { ListBlockedDates, Listing } from '../../models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import moment from 'moment';

const blockImportedDates = {

    type: ListBlockedDatesType,

    args: {
        calendarId: { type: new NonNull(IntType) },
        listId: { type: new NonNull(IntType) },
        blockedDates: { type: new List(StringType) },
    },

    async resolve({ request }, { calendarId, listId, blockedDates }) {

        // Check whether user is logged in
        if (request.user || request.user.admin) {
            var blockedDatesCollection = [];
            var reservationDatesCollection = [];
            let where = { id: listId };
            if (!request.user.admin) {
                where = {
                    id: listId,
                    userId: request.user.id
                };
            }
            // Remove Existing Imported Blocked Dates
            const isListingAvailable = await Listing.find({ where });

            if (isListingAvailable) {
                if (calendarId) {
                    await ListBlockedDates.destroy({
                        where: {
                            listId,
                            calendarId
                        }
                    });
                }

                if (blockedDates && blockedDates.length > 0) {

                    // Collect rest of the blocked dates for that list                
                    const reservationDates = await ListBlockedDates.findAll({
                        where: {
                            listId
                        }
                    });

                    // Prepare for reservation blocked dates
                    if (reservationDates && reservationDates.length > 0) {
                        reservationDates.map((item) => {
                            reservationDatesCollection.push({ blockedDates: item.blockedDates, id: item.id, reservationId: item.reservationId });
                        })
                    }

                    // Prepare for bulk imported blocked dates
                    blockedDates.map(async (item) => {
                        let oldRecords = reservationDatesCollection.find((v) => moment(item).format('YYYY-MM-DD') === moment(v.blockedDates).format('YYYY-MM-DD'));
                        let checkDate = reservationDatesCollection.indexOf(item);
                        let blockedDatesInstance;
                        if (checkDate === -1 && !oldRecords) {
                            blockedDatesInstance = {
                                id: null,
                                listId,
                                calendarId,
                                blockedDates: item,
                                calendarStatus: 'blocked'
                            };
                            blockedDatesCollection.push(blockedDatesInstance);
                        } else if (checkDate === -1 && oldRecords && !oldRecords.reservationId) {
                            //get data for updating
                            blockedDatesInstance = {
                                id: oldRecords.id,
                                listId,
                                calendarId,
                                blockedDates: oldRecords.blockedDates,
                                calendarStatus: 'blocked'
                            }
                            blockedDatesCollection.push(blockedDatesInstance);
                        }
                        /*let blockedDatesInstance = {
                            listId,
                            calendarId,
                            blockedDates: item
                        };
                        blockedDatesCollection.push(blockedDatesInstance);*/
                    })

                    // Do the bulk insert for the imported blocked dates
                    const bulkCreate = await ListBlockedDates.bulkCreate(blockedDatesCollection, {
                        updateOnDuplicate: ['blockedDates', 'listId', 'createdAt', 'updatedAt', 'calendarId', 'calendarStatus']
                    });

                    if (bulkCreate) {
                        return {
                            status: '200'
                        };
                    }

                } else {
                    return {
                        status: '200'
                    };
                }
            } else {
                return {
                    status: '404'
                };
            }



        } else {
            return {
                status: '403'
            };
        }
    },
};

export default blockImportedDates;


/**
mutation BlockImportedDates($listId: Int!, $calendarId: Int!, $blockedDates: [String]) {
    blockImportedDates(listId: $listId, calendarId: $calendarId, blockedDates: $blockedDates) {
        status
    }
}
 */
