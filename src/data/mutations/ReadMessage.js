// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ThreadItemsType from '../types/ThreadItemsType';

// Sequelize models
import { ThreadItems, Threads } from '../../data/models';

const readMessage = {

  type: ThreadItemsType,

  args: {
    threadId: { type: new NonNull(IntType) }
  },

  async resolve({ request, response }, {
    threadId
  }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;

      // Create a thread item
      const threadItems = await ThreadItems.update({
        isRead: true
      }, {
          where: {
            threadId,
            sentBy: {
              $ne: userId
            },
            isRead: false
          }
        }); 

      const updateThreads = await Threads.update({
        isRead: true,
        messageUpdatedDate: new Date()
      }, {
          where: {
            id: threadId,
          }
        });

      return {
        status: 'updated'
      };
    } else {
      return {
        status: 'notLoggedIn',
      };
    }
  },
};

export default readMessage;
