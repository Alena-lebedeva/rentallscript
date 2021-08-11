import UnreadCountType from '../types/UnreadCountType';
import { Threads, ThreadItems } from '../../data/models';
const getUnreadCount = {
  type: UnreadCountType,
  async resolve({ request }) {
    // Check if user already logged in
    if (request.user && !request.user.admin) {
      // For Host
      const hostCount = await Threads.count({
        where: {
          host: request.user.id
        },
        include: [{
          model: ThreadItems,
          as: 'threadItems',
          require: true,
          where: {
            sentBy: {
              $ne: request.user.id
            },
            isRead: false
          },
          order: [['isRead', 'DSC']]
        }]
      });
      // For Travelling
      const guestCount = await Threads.count({
        where: {
          guest: request.user.id
        },
        include: [{
          model: ThreadItems,
          as: 'threadItems',
          require: true,
          where: {
            sentBy: {
              $ne: request.user.id
            },
            isRead: false
          },
          order: [['isRead', 'DSC']]
        }]
      });
      let total = hostCount + guestCount;

      return {
        hostCount,
        guestCount,
        total
      };
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};
export default getUnreadCount;