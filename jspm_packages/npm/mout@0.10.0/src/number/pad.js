/* */ 
"format cjs";
define(['../string/lpad', '../lang/toNumber'], function(lpad, toNumber){

    /**
     * Add padding zeros if n.length < minLength.
     */
    function pad(n, minLength, char){
        n = toNumber(n);
        return lpad(''+ n, minLength, char || '0');
    }

    return pad;

});
