/* */ 
"format cjs";
define(['../lang/isDate'], function (isDate) {

    /**
     * checks if it's a leap year
     */
    function isLeapYear(fullYear){
        if (isDate(fullYear)) {
            fullYear = fullYear.getFullYear();
        }
        return fullYear % 400 === 0 || (fullYear % 100 !== 0 && fullYear % 4 === 0);
    }

    return isLeapYear;

});
