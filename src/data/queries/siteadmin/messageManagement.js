import MessageManagementWholeType from '../../types/siteadmin/MessageManagementWholeType';

import { Threads } from '../../../data/models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
// For sequelize functions
import sequelize from '../../sequelize';
import moment from 'moment';
const messageManagement = {
    type: MessageManagementWholeType,
    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType },
    },
    async resolve({ request, response }, { currentPage, searchList }) {
        if (request.user && request.user.admin == true) {
            const limit = 10;
            let offset = 0;
            // Offset from Current Page
            if (currentPage) {
                offset = (currentPage - 1) * limit;
            }
            let usersData, userCountLength, where;
            if (searchList) {
                // let getDate = moment(searchList).format('YYYY-MM-DD');
                where = {
                    $or: [
                        {
                            id: {
                                $or: [
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Threads WHERE listId IN(SELECT id FROM Listing WHERE title LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Threads WHERE host IN(SELECT userId FROM UserProfile WHERE displayName LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Threads WHERE guest IN(SELECT userId FROM UserProfile WHERE displayName LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Threads WHERE host IN(SELECT id FROM User WHERE email LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Threads WHERE guest IN(SELECT id FROM User WHERE email LIKE "%${searchList}%")`
                                            )]
                                    },
                                ]
                            },

                        }
                    ],
                }
                userCountLength = await Threads.count({
                    where
                });
                usersData = await Threads.findAll({
                    where,
                    order: [['createdAt', 'ASC']],
                    limit,
                    offset,
                });
            } else {
                userCountLength = await Threads.count({});
                // Get All User Profile Data
                usersData = await Threads.findAll({
                    limit,
                    offset,
                    order: [
                        ['messageUpdatedDate', 'DESC']
                    ],
                });
            }
            return {
                usersData,
                count: userCountLength
            };
        }
    },
};
export default messageManagement;
