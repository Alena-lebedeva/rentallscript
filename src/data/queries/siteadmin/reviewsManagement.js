import ReviewsWholeType from '../../types/siteadmin/ReviewsWholeType';

import { Reviews } from '../../../data/models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
// For sequelize functions
import sequelize from '../../sequelize';

const reviewsManagement = {
    type: ReviewsWholeType,
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

            let reviewsData, userCountLength, where;
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
                                                `SELECT id FROM Reviews WHERE listId IN(SELECT id FROM Listing WHERE title LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE reviewContent LIKE "%${searchList}%"`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE rating LIKE "%${searchList}%"`
                                            )]
                                    },

                                ]
                            },

                        }
                    ],
                }
                userCountLength = await Reviews.count({
                    where
                });
                reviewsData = await Reviews.findAll({
                    where,
                    order: [['updatedAt', 'DESC']],
                    limit,
                    offset,
                });
            } else {
                userCountLength = await Reviews.count({});
                // Get All User Profile Data
                reviewsData = await Reviews.findAll({
                    limit,
                    offset,
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                });
            }
            return {
                reviewsData,
                count: userCountLength
            };
        }
    },
};
export default reviewsManagement;
