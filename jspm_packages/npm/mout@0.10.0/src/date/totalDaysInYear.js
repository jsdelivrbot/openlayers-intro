/* */ 
"format cjs";
define(['./isLeapYear'], function (isLeapYear) {

    /**
     * return the amount of days in the year following the gregorian calendar
     * and leap years
     */
    function totalDaysInYear(fullYear){
        return isLeapYear(fullYear)? 366 : 365;
    }

    return totalDaysInYear;

});
