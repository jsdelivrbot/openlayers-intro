/* */ 
(function(process) {
  var totalDaysInMonth = require('./totalDaysInMonth');
  var totalDaysInYear = require('./totalDaysInYear');
  var convert = require('../time/convert');
  function diff(start, end, unitName) {
    if (start > end) {
      var swap = start;
      start = end;
      end = swap;
    }
    var output;
    if (unitName === 'month') {
      output = getMonthsDiff(start, end);
    } else if (unitName === 'year') {
      output = getYearsDiff(start, end);
    } else if (unitName != null) {
      if (unitName === 'day') {
        start = toUtc(start);
        end = toUtc(end);
      }
      output = convert(end - start, 'ms', unitName);
    } else {
      output = end - start;
    }
    return output;
  }
  function toUtc(d) {
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
  }
  function getMonthsDiff(start, end) {
    return getElapsedMonths(start, end) + getElapsedYears(start, end) * 12 + getFractionalMonth(start, end);
  }
  function getYearsDiff(start, end) {
    var elapsedYears = getElapsedYears(start, end);
    return elapsedYears + getFractionalYear(start, end, elapsedYears);
  }
  function getElapsedMonths(start, end) {
    var monthDiff = end.getMonth() - start.getMonth();
    if (monthDiff < 0) {
      monthDiff += 12;
    }
    if (start.getDate() > end.getDate()) {
      monthDiff -= 1;
    }
    return monthDiff;
  }
  function getElapsedYears(start, end) {
    var yearDiff = end.getFullYear() - start.getFullYear();
    if (start.getMonth() > end.getMonth()) {
      yearDiff -= 1;
    }
    return yearDiff;
  }
  function getFractionalMonth(start, end) {
    var fractionalDiff = 0;
    var startDay = start.getDate();
    var endDay = end.getDate();
    if (startDay !== endDay) {
      var startTotalDays = totalDaysInMonth(start);
      var endTotalDays = totalDaysInMonth(end);
      var totalDays;
      var daysElapsed;
      if (startDay > endDay) {
        var baseDay = startTotalDays - startDay;
        daysElapsed = endDay + baseDay;
        totalDays = (startDay > endTotalDays) ? endTotalDays + baseDay + 1 : startDay + baseDay;
      } else {
        daysElapsed = endDay - startDay;
        totalDays = endTotalDays;
      }
      fractionalDiff = daysElapsed / totalDays;
    }
    return fractionalDiff;
  }
  function getFractionalYear(start, end, elapsedYears) {
    var base = elapsedYears ? new Date(end.getFullYear(), start.getMonth(), start.getDate()) : start;
    var elapsedDays = diff(base, end, 'day');
    return elapsedDays / totalDaysInYear(end);
  }
  module.exports = diff;
})(require('process'));
