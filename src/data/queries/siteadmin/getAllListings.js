// Query Type
import GetAllListingType from '../../types/siteadmin/GetAllListingType';

// For sequelize functions
import sequelize from '../../sequelize';
import moment from 'moment';

// Database models
import { Listing } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const getAllListings = {
  type: GetAllListingType,
  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType },
  },

  async resolve({ request }, { currentPage, searchList }) {

    if (request.user && request.user.admin == true) {
      const limit = 10;
      let offset = 0;
      // Offset from Current Page
      if (currentPage) {
        offset = (currentPage - 1) * limit;
      }
      let getListings, listCountLength, where;
      if (searchList) {
        let getDate = moment(searchList).format('YYYY-MM-DD');
        where = {
          $or: [
            {
              title: {
                $like: '%' + searchList + '%'
              }
            },
            {
              city: {
                $like: '%' + searchList + '%'
              }
            },
            {
              state: {
                $like: '%' + searchList + '%'
              }
            },
            {
              country: {
                $like: '%' + searchList + '%'
              }
            },
            {
              street: {
                $like: '%' + searchList + '%'
              }
            },
            {
              buildingName: {
                $like: '%' + searchList + '%'
              }
            },
            {
              createdAt: {
                $in: [
                  sequelize.literal(`
                  SELECT
                  createdAt
                  FROM
                      Listing
                  WHERE createdAt like '%${getDate}%'
                `)
                ]
              }
            },
            {
              userId: {
                $in: [
                  sequelize.literal(`
                  SELECT
                      userId
                  FROM
                      UserProfile
                  WHERE firstName like '%${searchList}%'
                `)
                ]
              }
            },
            {
              userId: {
                $in: [
                  sequelize.literal(`
                  SELECT
                      id
                  FROM
                      User
                  WHERE email like '%${searchList}%'
                `)
                ]
              }
            }
          ]
        }
        listCountLength = await Listing.count({
          where
        });
        getListings = await Listing.findAll({
          limit,
          offset,
          order: [['id', 'ASC']],
          where
          /*where: {
            isPublished: true
          }*/
        });
      } else {
        listCountLength = await Listing.count();
        getListings = await Listing.findAll({
          limit,
          offset,
          order: [['id', 'ASC']],
          /*where: {
            isPublished: true
          }*/
        });
      }

      return {
        usersData: getListings,
        count: listCountLength
      };
    } else {
      return {
        status: 'failed'
      }
    }
  },
};

export default getAllListings;