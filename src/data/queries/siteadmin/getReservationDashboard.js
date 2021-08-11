import ReservationDashboardType from '../../types/siteadmin/ReservationDashboardType';
import { Reservation } from '../../../data/models';

const getReservationDashboard = {

    type: ReservationDashboardType,

    async resolve({ request }) {

        const totalCount = await Reservation.count({
            where:{
                paymentState:'completed'
            },
        });

        const todayCount = await Reservation.count({
            where: {
                createdAt: {
                    $lt: new Date(),
                    $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                },
                paymentState: 'completed'

            },
        });

        const monthCount = await Reservation.count({
            where: {
                createdAt: {
                    $lt: new Date(),
                    $gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                },
                paymentState: 'completed'

            },
        });

        return {
            totalCount,
            todayCount,
            monthCount
        };

    },
};

export default getReservationDashboard;
