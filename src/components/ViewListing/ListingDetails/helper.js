import moment from 'moment';

export function checkIn(checkInStart, checkInEnd) {
  let checkIn;
  if (checkInStart === "Flexible" && checkInEnd === "Flexible" ){
    checkIn = "Flexible";
  } else if (checkInStart === "Flexible") {
    checkIn = "Flexible" + " - " + generateTime(checkInEnd);
  } else if (checkInEnd === "Flexible"){
    checkIn = generateTime(checkInStart) + ' - ' + "Flexible";
  } else {
    checkIn = generateTime(checkInStart) + ' - ' + generateTime(checkInEnd);
  }
 return checkIn;
};

export function checkValue(value, defaultValue) {
  return value !== null ? value : defaultValue;
};

export function generateTime(time) {
  let timeLabel;
  time = time == 25 ? 1 : time;
  time = time == 26 ? 2 : time;
    timeLabel = moment(time, ["HH"]).format("h A");
  return timeLabel;
}