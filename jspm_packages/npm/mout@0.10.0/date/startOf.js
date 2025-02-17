/* */ 
var clone = require('../lang/clone');
function startOf(date, period) {
  date = clone(date);
  switch (period) {
    case 'year':
      date.setMonth(0);
    case 'month':
      date.setDate(1);
    case 'week':
    case 'day':
      date.setHours(0);
    case 'hour':
      date.setMinutes(0);
    case 'minute':
      date.setSeconds(0);
    case 'second':
      date.setMilliseconds(0);
      break;
    default:
      throw new Error('"' + period + '" is not a valid period');
  }
  if (period === 'week') {
    var weekDay = date.getDay();
    var baseDate = date.getDate();
    if (weekDay) {
      if (weekDay >= baseDate) {
        date.setDate(0);
      }
      date.setDate(date.getDate() - date.getDay());
    }
  }
  return date;
}
module.exports = startOf;
