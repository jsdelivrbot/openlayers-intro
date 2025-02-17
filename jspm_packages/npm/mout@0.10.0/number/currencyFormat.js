/* */ 
var toNumber = require('../lang/toNumber');
function currencyFormat(val, nDecimalDigits, decimalSeparator, thousandsSeparator) {
  val = toNumber(val);
  nDecimalDigits = nDecimalDigits == null ? 2 : nDecimalDigits;
  decimalSeparator = decimalSeparator == null ? '.' : decimalSeparator;
  thousandsSeparator = thousandsSeparator == null ? ',' : thousandsSeparator;
  var fixed = val.toFixed(nDecimalDigits),
      parts = new RegExp('^(-?\\d{1,3})((?:\\d{3})+)(\\.(\\d{' + nDecimalDigits + '}))?$').exec(fixed);
  if (parts) {
    return parts[1] + parts[2].replace(/\d{3}/g, thousandsSeparator + '$&') + (parts[4] ? decimalSeparator + parts[4] : '');
  } else {
    return fixed.replace('.', decimalSeparator);
  }
}
module.exports = currencyFormat;
