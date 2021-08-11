let DateBetween = function (startDate, endDate) {
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let distance = endDate - startDate;

  if (distance < 0) {
    return false;
  }

  let days = Math.floor(distance / day);
  let hours = Math.floor((distance % day) / hour);
  let minutes = Math.floor((distance % hour) / minute);
  let seconds = Math.floor((distance % minute) / second);


  let between = [];

  //days > 0 ? between.push(`${days} : `) : false;
  hours > 0 ? between.push(`${hours} : `) : between.push(`00`);
  minutes > 0 ? between.push(`${minutes} : `) : between.push(`00`);
  seconds > 0 ? between.push(`${seconds}`) : between.push(`00`);

  return between.join(' ');
}

module.exports = DateBetween;