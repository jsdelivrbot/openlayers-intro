/* */ 
"format cjs";
define([
    '../lang/toString',
    '../object/get'
], function(toString, get) {

    var stache = /\{\{([^\}]+)\}\}/g; //mustache-like

    /**
     * String interpolation
     */
    function interpolate(template, replacements, syntax){
        template = toString(template);
        var replaceFn = function(match, prop){
            return toString( get(replacements, prop) );
        };
        return template.replace(syntax || stache, replaceFn);
    }

    return interpolate;

});
