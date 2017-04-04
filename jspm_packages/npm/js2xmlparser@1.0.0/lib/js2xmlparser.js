/* */ 
(function(process) {
  (function() {
    "use strict";
    var xmlDeclaration = true;
    var xmlVersion = "1.0";
    var xmlEncoding = "UTF-8";
    var attributeString = "@";
    var aliasString = "=";
    var valueString = "#";
    var prettyPrinting = true;
    var indentString = "\t";
    var convertMap = {};
    var arrayMap = {};
    var useCDATA = false;
    module.exports = function(root, data, options) {
      return toXML(init(root, data, options));
    };
    var init = function(root, data, options) {
      setOptionDefaults();
      if (typeof root !== "string") {
        throw new Error("root element must be a string");
      } else if (root === "") {
        throw new Error("root element cannot be empty");
      }
      if (typeof options === "object" && options !== null) {
        if ("declaration" in options) {
          if ("include" in options.declaration) {
            if (typeof options.declaration.include === "boolean") {
              xmlDeclaration = options.declaration.include;
            } else {
              throw new Error("declaration.include option must be a boolean");
            }
          }
          if ("encoding" in options.declaration) {
            if (typeof options.declaration.encoding === "string" || options.declaration.encoding === null) {
              xmlEncoding = options.declaration.encoding;
            } else {
              throw new Error("declaration.encoding option must be a string or null");
            }
          }
        }
        if ("attributeString" in options) {
          if (typeof options.attributeString === "string") {
            attributeString = options.attributeString;
          } else {
            throw new Error("attributeString option must be a string");
          }
        }
        if ("valueString" in options) {
          if (typeof options.valueString === "string") {
            valueString = options.valueString;
          } else {
            throw new Error("valueString option must be a string");
          }
        }
        if ("aliasString" in options) {
          if (typeof options.aliasString === "string") {
            aliasString = options.aliasString;
          } else {
            throw new Error("aliasString option must be a string");
          }
        }
        if ("prettyPrinting" in options) {
          if ("enabled" in options.prettyPrinting) {
            if (typeof options.prettyPrinting.enabled === "boolean") {
              prettyPrinting = options.prettyPrinting.enabled;
            } else {
              throw new Error("prettyPrinting.enabled option must be a boolean");
            }
          }
          if ("indentString" in options.prettyPrinting) {
            if (typeof options.prettyPrinting.indentString === "string") {
              indentString = options.prettyPrinting.indentString;
            } else {
              throw new Error("prettyPrinting.indentString option must be a string");
            }
          }
        }
        if ("convertMap" in options) {
          if (Object.prototype.toString.call(options.convertMap) === "[object Object]") {
            convertMap = options.convertMap;
          } else {
            throw new Error("convertMap option must be an object");
          }
        }
        if ("arrayMap" in options) {
          if (Object.prototype.toString.call(options.arrayMap) === "[object Object]") {
            arrayMap = options.arrayMap;
          } else {
            throw new Error("arrayMap option must be an object");
          }
        }
        if ("useCDATA" in options) {
          if (typeof options.useCDATA === "boolean") {
            useCDATA = options.useCDATA;
          } else {
            throw new Error("useCDATA option must be a boolean");
          }
        }
      }
      if (typeof data !== "string" && typeof data !== "object" && typeof data !== "number" && typeof data !== "boolean" && data !== null) {
        throw new Error("data must be an object (excluding arrays) or a JSON string");
      }
      if (data === null) {
        throw new Error("data must be an object (excluding arrays) or a JSON string");
      }
      if (Object.prototype.toString.call(data) === "[object Array]" && !(arrayMap && arrayMap[root])) {
        throw new Error("data must be an object (excluding arrays) or a JSON string, unless an arrayMap option exists for root");
      }
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      var tempData = {};
      tempData[root] = data;
      return tempData;
    };
    var toXML = function(object) {
      var xml = arguments[1] || "";
      var level = arguments[2] || 0;
      var i = null;
      var tempObject = {};
      for (var property in object) {
        if (object.hasOwnProperty(property)) {
          var elementName = property;
          if (/^\d/.test(property)) {
            elementName = "_" + property;
          }
          if (elementName === aliasString) {
            continue;
          }
          if (Object.prototype.toString.call(object[property]) === "[object Object]" && aliasString in object[property]) {
            elementName = object[property][aliasString];
          }
          if (Object.prototype.toString.call(object[property]) === "[object Array]") {
            if (arrayMap[property]) {
              xml += addIndent("<" + elementName, level);
              xml += addBreak(">");
            }
            for (i = 0; i < object[property].length; i++) {
              tempObject = {};
              var newLevel = level;
              if (arrayMap[property]) {
                tempObject[arrayMap[property]] = object[property][i];
                newLevel = level + 1;
              } else {
                tempObject[property] = object[property][i];
              }
              xml = toXML(tempObject, xml, newLevel);
            }
            if (arrayMap[property]) {
              xml += addBreak(addIndent("</" + elementName + ">", level));
            }
          } else if (Object.prototype.toString.call(object[property]) === "[object Object]") {
            xml += addIndent("<" + elementName, level);
            var lengthExcludingAttributes = Object.keys(object[property]).length;
            if (Object.prototype.toString.call(object[property][attributeString]) === "[object Object]") {
              lengthExcludingAttributes -= 1;
              for (var attribute in object[property][attributeString]) {
                if (object[property][attributeString].hasOwnProperty(attribute)) {
                  xml += " " + attribute + "=\"" + toString(object[property][attributeString][attribute], true) + "\"";
                }
              }
            } else if (typeof object[property][attributeString] !== "undefined") {
              lengthExcludingAttributes -= 1;
            }
            if (lengthExcludingAttributes === 0) {
              xml += addBreak("/>");
            } else if ((lengthExcludingAttributes === 1 || (lengthExcludingAttributes === 2 && aliasString in object[property])) && valueString in object[property]) {
              xml += addBreak(">" + toString(object[property][valueString], false) + "</" + elementName + ">");
            } else {
              xml += addBreak(">");
              for (var subProperty in object[property]) {
                if (object[property].hasOwnProperty(subProperty) && subProperty !== attributeString && subProperty !== valueString) {
                  tempObject = {};
                  tempObject[subProperty] = object[property][subProperty];
                  xml = toXML(tempObject, xml, level + 1);
                }
              }
              xml += addBreak(addIndent("</" + elementName + ">", level));
            }
          } else {
            xml += addBreak(addIndent("<" + elementName + ">" + toString(object[property], false) + "</" + elementName + ">", level));
          }
        }
      }
      if (level === 0) {
        xml = xml.replace(/\s+$/g, "");
        if (xmlDeclaration) {
          if (xmlEncoding === null) {
            xml = addBreak("<?xml version=\"" + xmlVersion + "\"?>") + xml;
          } else {
            xml = addBreak("<?xml version=\"" + xmlVersion + "\" encoding=\"" + xmlEncoding + "\"?>") + xml;
          }
        }
      }
      return xml;
    };
    var addIndent = function(data, level) {
      if (prettyPrinting) {
        var indent = "";
        for (var i = 0; i < level; i++) {
          indent += indentString;
        }
        data = indent + data;
      }
      return data;
    };
    var addBreak = function(data) {
      return prettyPrinting ? data + "\n" : data;
    };
    var toString = function(data, isAttribute) {
      var functionHelper = function(data) {
        if (Object.prototype.toString.call(data) === "[object Function]") {
          return functionHelper(data());
        } else {
          return data;
        }
      };
      if (Object.prototype.toString.call(data) in convertMap) {
        data = convertMap[Object.prototype.toString.call(data)](data);
      } else if ("*" in convertMap) {
        data = convertMap["*"](data);
      } else if (Object.prototype.toString.call(data) === "[object Function]") {
        data = functionHelper(data());
      } else if (Object.prototype.toString.call(data) === "[object Object]" && Object.keys(data).length === 0) {
        data = "";
      }
      if (typeof data !== "string") {
        data = (data === null || typeof data === "undefined") ? "" : data.toString();
      }
      if (useCDATA && !isAttribute) {
        data = "<![CDATA[" + data.replace(/]]>/gm, "]]]]><![CDATA[>") + "]]>";
      } else {
        data = data.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/'/gm, "&apos;");
      }
      return data;
    };
    var setOptionDefaults = function() {
      useCDATA = false;
      convertMap = {};
      arrayMap = {};
      xmlDeclaration = true;
      xmlVersion = "1.0";
      xmlEncoding = "UTF-8";
      attributeString = "@";
      aliasString = "=";
      valueString = "#";
      prettyPrinting = true;
      indentString = "\t";
    };
  })();
})(require('process'));
