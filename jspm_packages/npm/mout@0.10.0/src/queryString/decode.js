/* */ 
"format cjs";
define(['../string/typecast', '../lang/isString', '../lang/isArray', '../object/hasOwn'], function (typecast, isString, isArray, hasOwn) {

    /**
     * Decode query string into an object of keys => vals.
     */
    function decode(queryStr, shouldTypecast) {
        var queryArr = (queryStr || '').replace('?', '').split('&'),
            count = -1,
            length = queryArr.length,
            obj = {},
            item, pValue, pName, toSet;

        while (++count < length) {
            item = queryArr[count].split('=');
            pName = item[0];
            if (!pName || !pName.length){
                continue;
            }
            pValue = shouldTypecast === false ? item[1] : typecast(item[1]);
            toSet = isString(pValue) ? decodeURIComponent(pValue) : pValue;
            if (hasOwn(obj,pName)){
                if(isArray(obj[pName])){
                    obj[pName].push(toSet);
                } else {
                    obj[pName] = [obj[pName],toSet];
                }
            } else {
                obj[pName] = toSet;
           }
        }
        return obj;
    }

    return decode;
});
