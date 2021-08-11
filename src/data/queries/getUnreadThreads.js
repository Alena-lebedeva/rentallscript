// GrpahQL
import {
  GraphQLList as List
} from 'graphql';

import ThreadsType from '../types/ThreadsType';
import { Threads, ThreadItems } from '../../data/models';

const getUnreadThreads = {

  type: new List(ThreadsType),

  async resolve({ request }) {
    // Check if user already logged in
    if (request.user && !request.user.admin) {

      return await Threads.findAll({
        where: {
          $or: [
            {
              host: request.user.id
            },
            {
              guest: request.user.id
            }
          ]
        },
        order: [['updatedAt', 'DESC']],
        include: [{
          model: ThreadItems,
          as: 'threadItems',
          require: true,
          where: {
            sentBy: {
              $ne: request.user.id
            },
            isRead: false
          }
        }]
      });

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default getUnreadThreads;

/**
query getUnreadThreads{
  getUnreadThreads {
    id
    listId
    host
    guest
    threadItemUnread {
      id
      threadId
      sentBy
      isRead
      type
      createdAt
      startDate
      endDate
      personCapacity
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