// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

import AllThreadsType from '../types/AllThreadsType';
import { Threads } from '../../data/models';

const GetAllThreads = {

  type: AllThreadsType,

  args: {
    threadType: { type: StringType },
    threadId: { type: IntType },
    currentPage: { type: IntType },
  },

  async resolve({ request }, { threadType, threadId, currentPage }) {
    const limit = 5;
    let offset = 0;
    // Offset from Current Page
    if (currentPage) {
      offset = (currentPage - 1) * limit;
    }
    // Check if user already logged in
    if (request.user && !request.user.admin) {
      let where = {};

      // For Getting Specific type of threads of a logged in user(Either 'host' or 'guest')
      if (threadType === 'host') {
        where = {
          host: request.user.id
        }
      } else {
        where = {
          guest: request.user.id
        }
      }

      // For Getting Specific Thread
      if (threadId != undefined && threadId != null) {
        where = Object.assign({}, where, { id: threadId });
      }
      const count = await Threads.count({ where });
      const threadsData = await Threads.findAll({
        where,
        //order: [[`isRead`, `ASC`]],
        order: [[`isRead`, `ASC`], ['updatedAt', 'DESC']],
        order: [
          ['messageUpdatedDate', 'DESC'],
        ],
        // include: [{
        //   model: ThreadItems,
        //   as: 'threadItems',
        //   required: true,
        //   duplicating: true
        // }],
        // order: [
        //   [ sequelize.col('threadItems.isRead'), 'DESC'],
        // ],
        // group: [ sequelize.col('threadItems.id') ],
        limit,
        offset,
      });
      return {
        threadsData,
        count
      };
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default GetAllThreads;

/**
query GetAllThreads($threadType: String, $threadId: Int){
  GetAllThreads(threadType: $threadType, threadId: $threadId) {
    id
    listId
    host
    guest
    threadItem {
      id
      threadId
      sentBy
      type
      createdAt
    }
    threadItems {
      id
      threadId
      sentBy
      type
      createdAt
    }
    hostProfile {
      profileId
      firstName
      picture
    }
    guestProfile {
      profileId
      firstName
      picture
    }
    status
  }
}
**/