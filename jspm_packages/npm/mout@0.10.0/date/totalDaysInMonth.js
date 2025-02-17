/* */ 
var isDate = require('../lang/isDate');
var isLeapYear = require('./isLeapYear');
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function totalDaysInMonth(fullYear, monthIndex) {
  if (isDate(fullYear)) {
    var date = fullYear;
    year = date.getFullYear();
    monthIndex = date.getMonth();
  }
  if (monthIndex === 1 && isLeapYear(fullYear)) {
    return 29;
  } else {
    return DAYS_IN_MONTH[monthIndex];
  }
}
module.exports = totalDaysInMonth;
