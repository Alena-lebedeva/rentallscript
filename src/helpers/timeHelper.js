export function formattingTime(time) {
  let amPM, updatedTime;
  if (!isNaN(time)) {
    if (time < 11 || time > 23) {
      amPM = "AM";
    } else {
      amPM = "PM";
    }
    if (time < 12) {
      return time + amPM;
    } else {
      if (time > 24) {
        updatedTime = Number(time) - 24;
      } else if (time == 12) {
        updatedTime = 12;
      } else {
        updatedTime = Number(time) - 12;
      }
      return updatedTime + amPM;
    }
  }
};

export function checkInData(checkDataValue) {
  let checkIn;
  if (checkDataValue === "Flexible") {
    checkIn = "Flexible";
  } else {
    if (checkDataValue != null) {
      checkIn = formattingTime(checkDataValue);
    }
  }

  return checkIn;
};

export function checkIn(checkInStart, checkInEnd) {
  let checkIn;
  if (checkInStart === "Flexible") {
    checkIn = "Flexible";
  } else {
    if (checkInEnd === "Flexible") {
      checkIn = "From " + formattingTime(checkInStart);
    } else {
      if (checkInStart != null && checkInEnd != null) {
        checkIn = formattingTime(checkInStart) + " - " + formattingTime(checkInEnd);
      }
    }
  }

  return checkIn;
};

export function checkValue(value, defaultValue) {
  return value !== null ? value : defaultValue;
};