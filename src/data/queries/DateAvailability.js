import DateAvailabilityType from '../types/DateAvailabilityType';
import { ListBlockedDates } from '../../data/models';
import moment from 'moment';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const DateAvailability = {

  type: DateAvailabilityType,

  args: {
    listId: { type: new NonNull(IntType) },
    startDate: { type: new NonNull(StringType) },
    endDate: { type: new NonNull(StringType) },
  },

  async resolve({ request, response }, { listId, startDate, endDate }) {

    const checkAvailableDates = await ListBlockedDates.findAll({
      where: {
        listId,
        blockedDates: {
          $between: [startDate, endDate]
        }
      }
    });

    let momentStartDate = moment(startDate);
    let momentEndDate = moment(endDate);
    let dayDifference = momentEndDate.diff(momentStartDate, 'days');
    let stayedNightCount, rangeStart, rangeEnd, availableDates, dateRangeDays;
    let stayedNights = [], dateRange = [], checkAvailable = [];
    let updateDates, checkDates, calendarStatusValue, availableStatus;
    let isAvailable = false, dateRangeCount, checkAvailableDatesCount;

    // Find stayed nights
    for (let i = 0; i < dayDifference; i++) {
      let currentDate = moment(startDate).add(i, 'day');
      stayedNights.push(currentDate);
    }

    rangeStart = new Date(startDate);
    rangeEnd = new Date(endDate);
    dateRange.push(rangeStart);
    rangeStart = new Date(+rangeStart);
    while (rangeStart < endDate) {
      dateRange.push(rangeStart);
      var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
      rangeStart = new Date(newDate);
    }

    stayedNightCount = stayedNights.length;
    checkAvailableDatesCount = checkAvailableDates.length;

    await Promise.all(dateRange && dateRange.map(async (values, keys) => {
      dateRangeDays = moment(values).format('YYYY-MM-DD');
      checkAvailableDates && checkAvailableDates.map((item, key) => {
        calendarStatusValue = moment(item.blockedDates).format('YYYY-MM-DD');
        availableStatus = item.calendarStatus;
        if (availableStatus == 'blocked') {
          isAvailable = true;
        }
      })
      if (isAvailable && checkAvailableDatesCount == stayedNightCount) {
        isAvailable = true;
      }
    }))

    // if (checkAvailableDates.length > 0) {
    if (isAvailable == true && checkAvailableDates.length > 0) {
      return {
        status: "NotAvailable"
      }
    } else {
      return {
        status: "Available"
      }
    }


  },
};

export default DateAvailability;
