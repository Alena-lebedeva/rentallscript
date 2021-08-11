import { Reservation, ListBlockedDates } from '../../data/models';
import moment from 'moment';
import sequelize from 'sequelize';

export async function blockDates(
  reservationId
) {
  var dates = [];
  const reservation = await Reservation.findOne({
    where: {
      id: reservationId,
    }
  });

  if (reservation) {
    var dates = [];
    var start = reservation.checkIn;
    var end = reservation.checkOut;
    var copy = new Date(start);
    let endTimevalue = end.setDate(end.getDate() - 1);
    let endTime = new Date(endTimevalue);
    dates.push(copy);
    while (start < endTime) {
      dates.push(start);
      var newDate = start.setDate(start.getDate() + 1);
      start = new Date(newDate);
    }

    let day;
    let listBlockedDates;
    dates.map(async (blockedDates) => {

      day = moment(blockedDates).format('YYYY-MM-DD');
      let dayList = sequelize.where(sequelize.fn('DATE', sequelize.col('blockedDates')), day);

      let blockedDatesFind = await ListBlockedDates.findAll({
        where: {
          blockedDates: dayList,
          listId: reservation.listId,
          calendarStatus: 'available'
        }
      });

      let blockfindDates, createdDates, updateDates;
      let chooseDates = moment(moment(blockedDates)).format('YYYY-MM-DD');

      blockedDatesFind.map(async (value, keys) => {
        blockfindDates = moment(value.blockedDates).format('YYYY-MM-DD');
        if (chooseDates == blockfindDates) {
          updateDates = await ListBlockedDates.update({
            listId: reservation.listId,
            blockedDates: blockedDates,
            calendarStatus: 'blocked',
            reservationId,
          },
            {
              where: {
                listId: reservation.listId,
                blockedDates: dayList
              }
            });
        } else {
          createdDates = await ListBlockedDates.create({
            listId: reservation.listId,
            blockedDates: blockedDates,
            calendarStatus: 'blocked',
            reservationId
          });
        }
      });

      if (blockedDatesFind.length == 0) {
        createdDates = await ListBlockedDates.create({
          listId: reservation.listId,
          blockedDates: blockedDates,
          calendarStatus: 'blocked',
          reservationId
        });
      }

    });
  }
}