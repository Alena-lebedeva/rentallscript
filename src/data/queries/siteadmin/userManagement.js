import UserManagementWholeDataType from '../../types/siteadmin/UserManagementWholeDataType';
import { User, UserProfile, Listing  } from '../../../data/models';
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
// For sequelize functions
import sequelize from '../../sequelize';
import moment from 'moment';
const userManagement = {
  type: UserManagementWholeDataType,

  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType },
    userType: { type: StringType }
  },

  async resolve({ request, response }, { currentPage, searchList, userType }) {

    if (request.user && request.user.admin == true) {
      const limit = 10;
      let offset = 0;
      let userTypeFilter = {}, keywordFilter = {};
      let usersData = [], userCountLength = 0;

      // Offset from Current Page
      if (currentPage) {
        offset = (currentPage - 1) * limit;
      }
      
      // User type filter
      if (userType === '1') {
        userTypeFilter = {
          id: {
            $notIn: [sequelize.literal(`SELECT DISTINCT userId FROM Listing`)]
          }
        }
      } else if (userType === '2') {
        userTypeFilter = {
          id: {
            $in: [sequelize.literal(`SELECT DISTINCT userId FROM Listing`)]
          }
        }
      }

      if (searchList && searchList.length > 0 && searchList.toString().trim() != '') {
        let getDate = moment(searchList).format('YYYY-MM-DD');

        keywordFilter = {
          id: {
            $or: [{
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE lastName like '%${searchList}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE phoneNumber like '%${searchList}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE createdAt like '%${getDate}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${searchList}%'`)]
            }]
          }
        }
      }
  

      userCountLength = await User.count({ 
        where: { 
          $and: [
            { userDeletedAt: null },
            userTypeFilter,
            keywordFilter
          ]
        } 
      });
      // Get All User Profile Data
      usersData = await User.findAll({
        attributes: ['id', 'email', 'userBanStatus'],
        profile: {
          attributes: [
            'profileId',
            'firstName',
            'lastName',
            'dateOfBirth',
            'gender',
            'phoneNumber',
            'preferredLanguage',
            'preferredCurrency',
            'location',
            'info'
          ]
        },
        where: {
          $and: [
            { userDeletedAt: null },
            userTypeFilter,
            keywordFilter
          ]
          
        },
        order: [['createdAt', 'ASC']],
        limit,
        offset,
        include: [
          { model: UserProfile, as: 'profile' },
        ]
      });

      return await {
        usersData,
        count: userCountLength
      };
    }
  },
};
export default userManagement;
