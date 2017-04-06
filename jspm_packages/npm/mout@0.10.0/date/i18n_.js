/* */ 
var mixIn = require('../object/mixIn');
var enUS = require('./i18n/en-US');
var activeLocale = mixIn({}, enUS, {set: function(localeData) {
    mixIn(activeLocale, localeData);
  }});
module.exports = activeLocale;
