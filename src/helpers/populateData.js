export default {
  generateData(start, end, order) {
    let data = [];
    if (order === "desc") {
      for (let i = end; i >= start; i--) {
        data.push(i);
      }
    } else {
      for (let i = start; i <= end; i++) {
        data.push(i);
      }
    }

    return data;
  },

  isValidDate(year, month, day) {
    var d = new Date(year, month, day);
    if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
      return true;
    }
    return false;
  }
}
