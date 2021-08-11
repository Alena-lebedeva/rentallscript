import UserDashboardType from '../../types/siteadmin/UserDashboardType';
import { User } from '../../../data/models';

const getUserDashboard = {

  type: UserDashboardType,

  async resolve({ request }) {

    const totalCount = await User.count({
      where: {
        userDeletedAt: null
      },
    });

    const todayCount = await User.count({
      where: {
        createdAt: {
          $lt: new Date(),
          $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
        },
        userDeletedAt: null
      },
    });

    const monthCount = await User.count({
      where: {
        createdAt: {
          $lt: new Date(),
          $gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
        },
        userDeletedAt: null
      },
    });

    return {
      totalCount,
      todayCount,
      monthCount
    };

  },
};

export default getUserDashboard;
