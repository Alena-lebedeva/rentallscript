import ReportUserWholeType from '../../types/siteadmin/ReportUserWholeType';

import { ReportUser } from '../../../data/models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
// For sequelize functions
import sequelize from '../../sequelize';
import moment from 'moment';

const reportUserManagement = {
    type: ReportUserWholeType,
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

            let reportsData, userCountLength, where;
            if (searchList) {
                let getDate = moment(searchList).format('YYYY-MM-DD');
                where = {
                    $or: [
                        {
                            id: {
                                $or: [
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM ReportUser WHERE reporterId IN(SELECT userId FROM UserProfile WHERE displayName LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM ReportUser WHERE reporterId IN(SELECT id FROM User WHERE email LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM ReportUser WHERE userId IN(SELECT userId FROM UserProfile WHERE displayName LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM ReportUser WHERE userId IN(SELECT id FROM User WHERE email LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM ReportUser WHERE reportType LIKE "%${searchList}%"`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM ReportUser WHERE createdAt LIKE "%${getDate}%"`
                                            )]
                                    },

                                ]
                            },

                        }
                    ],
                }
                userCountLength = await ReportUser.count({
                    where
                });
                reportsData = await ReportUser.findAll({
                    where,
                    order: [['updatedAt', 'DESC']],
                    limit,
                    offset,
                });
            } else {
                userCountLength = await ReportUser.count({});
                // Get All User Profile Data
                reportsData = await ReportUser.findAll({
                    limit,
                    offset,
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                });
            }
            return {
                reportsData,
                count: userCountLength
            };
        }
    },
};
export default reportUserManagement;
