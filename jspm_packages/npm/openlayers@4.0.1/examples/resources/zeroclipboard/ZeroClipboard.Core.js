/* */ 
"format cjs";
(function(process) {
  (function(window, undefined) {
    "use strict";
    var _window = window,
        _document = _window.document,
        _navigator = _window.navigator,
        _setTimeout = _window.setTimeout,
        _clearTimeout = _window.clearTimeout,
        _setInterval = _window.setInterval,
        _clearInterval = _window.clearInterval,
        _getComputedStyle = _window.getComputedStyle,
        _encodeURIComponent = _window.encodeURIComponent,
        _ActiveXObject = _window.ActiveXObject,
        _Error = _window.Error,
        _parseInt = _window.Number.parseInt || _window.parseInt,
        _parseFloat = _window.Number.parseFloat || _window.parseFloat,
        _isNaN = _window.Number.isNaN || _window.isNaN,
        _now = _window.Date.now,
        _keys = _window.Object.keys,
        _defineProperty = _window.Object.defineProperty,
        _hasOwn = _window.Object.prototype.hasOwnProperty,
        _slice = _window.Array.prototype.slice,
        _unwrap = function() {
          var unwrapper = function(el) {
            return el;
          };
          if (typeof _window.wrap === "function" && typeof _window.unwrap === "function") {
            try {
              var div = _document.createElement("div");
              var unwrappedDiv = _window.unwrap(div);
              if (div.nodeType === 1 && unwrappedDiv && unwrappedDiv.nodeType === 1) {
                unwrapper = _window.unwrap;
              }
            } catch (e) {}
          }
          return unwrapper;
        }();
    var _args = function(argumentsObj) {
      return _slice.call(argumentsObj, 0);
    };
    var _extend = function() {
      var i,
          len,
          arg,
          prop,
          src,
          copy,
          args = _args(arguments),
          target = args[0] || {};
      for (i = 1, len = args.length; i < len; i++) {
        if ((arg = args[i]) != null) {
          for (prop in arg) {
            if (_hasOwn.call(arg, prop)) {
              src = target[prop];
              copy = arg[prop];
              if (target !== copy && copy !== undefined) {
                target[prop] = copy;
              }
            }
          }
        }
      }
      return target;
    };
    var _deepCopy = function(source) {
      var copy,
          i,
          len,
          prop;
      if (typeof source !== "object" || source == null || typeof source.nodeType === "number") {
        copy = source;
      } else if (typeof source.length === "number") {
        copy = [];
        for (i = 0, len = source.length; i < len; i++) {
          if (_hasOwn.call(source, i)) {
            copy[i] = _deepCopy(source[i]);
          }
        }
      } else {
        copy = {};
        for (prop in source) {
          if (_hasOwn.call(source, prop)) {
            copy[prop] = _deepCopy(source[prop]);
          }
        }
      }
      return copy;
    };
    var _pick = function(obj, keys) {
      var newObj = {};
      for (var i = 0,
          len = keys.length; i < len; i++) {
        if (keys[i] in obj) {
          newObj[keys[i]] = obj[keys[i]];
        }
      }
      return newObj;
    };
    var _omit = function(obj, keys) {
      var newObj = {};
      for (var prop in obj) {
        if (keys.indexOf(prop) === -1) {
          newObj[prop] = obj[prop];
        }
      }
      return newObj;
    };
    var _deleteOwnProperties = function(obj) {
      if (obj) {
        for (var prop in obj) {
          if (_hasOwn.call(obj, prop)) {
            delete obj[prop];
          }
        }
      }
      return obj;
    };
    var _containedBy = function(el, ancestorEl) {
      if (el && el.nodeType === 1 && el.ownerDocument && ancestorEl && (ancestorEl.nodeType === 1 && ancestorEl.ownerDocument && ancestorEl.ownerDocument === el.ownerDocument || ancestorEl.nodeType === 9 && !ancestorEl.ownerDocument && ancestorEl === el.ownerDocument)) {
        do {
          if (el === ancestorEl) {
            return true;
          }
          el = el.parentNode;
        } while (el);
      }
      return false;
    };
    var _getDirPathOfUrl = function(url) {
      var dir;
      if (typeof url === "string" && url) {
        dir = url.split("#")[0].split("?")[0];
        dir = url.slice(0, url.lastIndexOf("/") + 1);
      }
      return dir;
    };
    var _getCurrentScriptUrlFromErrorStack = function(stack) {
      var url,
          matches;
      if (typeof stack === "string" && stack) {
        matches = stack.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);
        if (matches && matches[1]) {
          url = matches[1];
        } else {
          matches = stack.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);
          if (matches && matches[1]) {
            url = matches[1];
          }
        }
      }
      return url;
    };
    var _getCurrentScriptUrlFromError = function() {
      var url,
          err;
      try {
        throw new _Error();
      } catch (e) {
        err = e;
      }
      if (err) {
        url = err.sourceURL || err.fileName || _getCurrentScriptUrlFromErrorStack(err.stack);
      }
      return url;
    };
    var _getCurrentScriptUrl = function() {
      var jsPath,
          scripts,
          i;
      if (_document.currentScript && (jsPath = _document.currentScript.src)) {
        return jsPath;
      }
      scripts = _document.getElementsByTagName("script");
      if (scripts.length === 1) {
        return scripts[0].src || undefined;
      }
      if ("readyState" in scripts[0]) {
        for (i = scripts.length; i--; ) {
          if (scripts[i].readyState === "interactive" && (jsPath = scripts[i].src)) {
            return jsPath;
          }
        }
      }
      if (_document.readyState === "loading" && (jsPath = scripts[scripts.length - 1].src)) {
        return jsPath;
      }
      if (jsPath = _getCurrentScriptUrlFromError()) {
        return jsPath;
      }
      return undefined;
    };
    var _getUnanimousScriptParentDir = function() {
      var i,
          jsDir,
          jsPath,
          scripts = _document.getElementsByTagName("script");
      for (i = scripts.length; i--; ) {
        if (!(jsPath = scripts[i].src)) {
          jsDir = null;
          break;
        }
        jsPath = _getDirPathOfUrl(jsPath);
        if (jsDir == null) {
          jsDir = jsPath;
        } else if (jsDir !== jsPath) {
          jsDir = null;
          break;
        }
      }
      return jsDir || undefined;
    };
    var _getDefaultSwfPath = function() {
      var jsDir = _getDirPathOfUrl(_getCurrentScriptUrl()) || _getUnanimousScriptParentDir() || "";
      return jsDir + "ZeroClipboard.swf";
    };
    var _pageIsFramed = function() {
      return window.opener == null && (!!window.top && window != window.top || !!window.parent && window != window.parent);
    }();
    var _flashState = {
      bridge: null,
      version: "0.0.0",
      pluginType: "unknown",
      disabled: null,
      outdated: null,
      sandboxed: null,
      unavailable: null,
      degraded: null,
      deactivated: null,
      overdue: null,
      ready: null
    };
    var _minimumFlashVersion = "11.0.0";
    var _zcSwfVersion;
    var _handlers = {};
    var _currentElement;
    var _copyTarget;
    var _clipData = {};
    var _clipDataFormatMap = null;
    var _flashCheckTimeout = 0;
    var _swfFallbackCheckInterval = 0;
    var _eventMessages = {
      ready: "Flash communication is established",
      error: {
        "flash-disabled": "Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.",
        "flash-outdated": "Flash is too outdated to support ZeroClipboard",
        "flash-sandboxed": "Attempting to run Flash in a sandboxed iframe, which is impossible",
        "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
        "flash-degraded": "Flash is unable to preserve data fidelity when communicating with JavaScript",
        "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.",
        "flash-overdue": "Flash communication was established but NOT within the acceptable time limit",
        "version-mismatch": "ZeroClipboard JS version number does not match ZeroClipboard SWF version number",
        "clipboard-error": "At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard",
        "config-mismatch": "ZeroClipboard configuration does not match Flash's reality",
        "swf-not-found": "The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity"
      }
    };
    var _errorsThatOnlyOccurAfterFlashLoads = ["flash-unavailable", "flash-degraded", "flash-overdue", "version-mismatch", "config-mismatch", "clipboard-error"];
    var _flashStateErrorNames = ["flash-disabled", "flash-outdated", "flash-sandboxed", "flash-unavailable", "flash-degraded", "flash-deactivated", "flash-overdue"];
    var _flashStateErrorNameMatchingRegex = new RegExp("^flash-(" + _flashStateErrorNames.map(function(errorName) {
      return errorName.replace(/^flash-/, "");
    }).join("|") + ")$");
    var _flashStateEnabledErrorNameMatchingRegex = new RegExp("^flash-(" + _flashStateErrorNames.slice(1).map(function(errorName) {
      return errorName.replace(/^flash-/, "");
    }).join("|") + ")$");
    var _globalConfig = {
      swfPath: _getDefaultSwfPath(),
      trustedDomains: window.location.host ? [window.location.host] : [],
      cacheBust: true,
      forceEnhancedClipboard: false,
      flashLoadTimeout: 3e4,
      autoActivate: true,
      bubbleEvents: true,
      containerId: "global-zeroclipboard-html-bridge",
      containerClass: "global-zeroclipboard-container",
      swfObjectId: "global-zeroclipboard-flash-bridge",
      hoverClass: "zeroclipboard-is-hover",
      activeClass: "zeroclipboard-is-active",
      forceHandCursor: false,
      title: null,
      zIndex: 999999999
    };
    var _config = function(options) {
      if (typeof options === "object" && options !== null) {
        for (var prop in options) {
          if (_hasOwn.call(options, prop)) {
            if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(prop)) {
              _globalConfig[prop] = options[prop];
            } else if (_flashState.bridge == null) {
              if (prop === "containerId" || prop === "swfObjectId") {
                if (_isValidHtml4Id(options[prop])) {
                  _globalConfig[prop] = options[prop];
                } else {
                  throw new Error("The specified `" + prop + "` value is not valid as an HTML4 Element ID");
                }
              } else {
                _globalConfig[prop] = options[prop];
              }
            }
          }
        }
      }
      if (typeof options === "string" && options) {
        if (_hasOwn.call(_globalConfig, options)) {
          return _globalConfig[options];
        }
        return;
      }
      return _deepCopy(_globalConfig);
    };
    var _state = function() {
      _detectSandbox();
      return {
        browser: _pick(_navigator, ["userAgent", "platform", "appName"]),
        flash: _omit(_flashState, ["bridge"]),
        zeroclipboard: {
          version: ZeroClipboard.version,
          config: ZeroClipboard.config()
        }
      };
    };
    var _isFlashUnusable = function() {
      return !!(_flashState.disabled || _flashState.outdated || _flashState.sandboxed || _flashState.unavailable || _flashState.degraded || _flashState.deactivated);
    };
    var _on = function(eventType, listener) {
      var i,
          len,
          events,
          added = {};
      if (typeof eventType === "string" && eventType) {
        events = eventType.toLowerCase().split(/\s+/);
      } else if (typeof eventType === "object" && eventType && typeof listener === "undefined") {
        for (i in eventType) {
          if (_hasOwn.call(eventType, i) && typeof i === "string" && i && typeof eventType[i] === "function") {
            ZeroClipboard.on(i, eventType[i]);
          }
        }
      }
      if (events && events.length) {
        for (i = 0, len = events.length; i < len; i++) {
          eventType = events[i].replace(/^on/, "");
          added[eventType] = true;
          if (!_handlers[eventType]) {
            _handlers[eventType] = [];
          }
          _handlers[eventType].push(listener);
        }
        if (added.ready && _flashState.ready) {
          ZeroClipboard.emit({type: "ready"});
        }
        if (added.error) {
          for (i = 0, len = _flashStateErrorNames.length; i < len; i++) {
            if (_flashState[_flashStateErrorNames[i].replace(/^flash-/, "")] === true) {
              ZeroClipboard.emit({
                type: "error",
                name: _flashStateErrorNames[i]
              });
              break;
            }
          }
          if (_zcSwfVersion !== undefined && ZeroClipboard.version !== _zcSwfVersion) {
            ZeroClipboard.emit({
              type: "error",
              name: "version-mismatch",
              jsVersion: ZeroClipboard.version,
              swfVersion: _zcSwfVersion
            });
          }
        }
      }
      return ZeroClipboard;
    };
    var _off = function(eventType, listener) {
      var i,
          len,
          foundIndex,
          events,
          perEventHandlers;
      if (arguments.length === 0) {
        events = _keys(_handlers);
      } else if (typeof eventType === "string" && eventType) {
        events = eventType.split(/\s+/);
      } else if (typeof eventType === "object" && eventType && typeof listener === "undefined") {
        for (i in eventType) {
          if (_hasOwn.call(eventType, i) && typeof i === "string" && i && typeof eventType[i] === "function") {
            ZeroClipboard.off(i, eventType[i]);
          }
        }
      }
      if (events && events.length) {
        for (i = 0, len = events.length; i < len; i++) {
          eventType = events[i].toLowerCase().replace(/^on/, "");
          perEventHandlers = _handlers[eventType];
          if (perEventHandlers && perEventHandlers.length) {
            if (listener) {
              foundIndex = perEventHandlers.indexOf(listener);
              while (foundIndex !== -1) {
                perEventHandlers.splice(foundIndex, 1);
                foundIndex = perEventHandlers.indexOf(listener, foundIndex);
              }
            } else {
              perEventHandlers.length = 0;
            }
          }
        }
      }
      return ZeroClipboard;
    };
    var _listeners = function(eventType) {
      var copy;
      if (typeof eventType === "string" && eventType) {
        copy = _deepCopy(_handlers[eventType]) || null;
      } else {
        copy = _deepCopy(_handlers);
      }
      return copy;
    };
    var _emit = function(event) {
      var eventCopy,
          returnVal,
          tmp;
      event = _createEvent(event);
      if (!event) {
        return;
      }
      if (_preprocessEvent(event)) {
        return;
      }
      if (event.type === "ready" && _flashState.overdue === true) {
        return ZeroClipboard.emit({
          type: "error",
          name: "flash-overdue"
        });
      }
      eventCopy = _extend({}, event);
      _dispatchCallbacks.call(this, eventCopy);
      if (event.type === "copy") {
        tmp = _mapClipDataToFlash(_clipData);
        returnVal = tmp.data;
        _clipDataFormatMap = tmp.formatMap;
      }
      return returnVal;
    };
    var _create = function() {
      var previousState = _flashState.sandboxed;
      _detectSandbox();
      if (typeof _flashState.ready !== "boolean") {
        _flashState.ready = false;
      }
      if (_flashState.sandboxed !== previousState && _flashState.sandboxed === true) {
        _flashState.ready = false;
        ZeroClipboard.emit({
          type: "error",
          name: "flash-sandboxed"
        });
      } else if (!ZeroClipboard.isFlashUnusable() && _flashState.bridge === null) {
        var maxWait = _globalConfig.flashLoadTimeout;
        if (typeof maxWait === "number" && maxWait >= 0) {
          _flashCheckTimeout = _setTimeout(function() {
            if (typeof _flashState.deactivated !== "boolean") {
              _flashState.deactivated = true;
            }
            if (_flashState.deactivated === true) {
              ZeroClipboard.emit({
                type: "error",
                name: "flash-deactivated"
              });
            }
          }, maxWait);
        }
        _flashState.overdue = false;
        _embedSwf();
      }
    };
    var _destroy = function() {
      ZeroClipboard.clearData();
      ZeroClipboard.blur();
      ZeroClipboard.emit("destroy");
      _unembedSwf();
      ZeroClipboard.off();
    };
    var _setData = function(format, data) {
      var dataObj;
      if (typeof format === "object" && format && typeof data === "undefined") {
        dataObj = format;
        ZeroClipboard.clearData();
      } else if (typeof format === "string" && format) {
        dataObj = {};
        dataObj[format] = data;
      } else {
        return;
      }
      for (var dataFormat in dataObj) {
        if (typeof dataFormat === "string" && dataFormat && _hasOwn.call(dataObj, dataFormat) && typeof dataObj[dataFormat] === "string" && dataObj[dataFormat]) {
          _clipData[dataFormat] = dataObj[dataFormat];
        }
      }
    };
    var _clearData = function(format) {
      if (typeof format === "undefined") {
        _deleteOwnProperties(_clipData);
        _clipDataFormatMap = null;
      } else if (typeof format === "string" && _hasOwn.call(_clipData, format)) {
        delete _clipData[format];
      }
    };
    var _getData = function(format) {
      if (typeof format === "undefined") {
        return _deepCopy(_clipData);
      } else if (typeof format === "string" && _hasOwn.call(_clipData, format)) {
        return _clipData[format];
      }
    };
    var _focus = function(element) {
      if (!(element && element.nodeType === 1)) {
        return;
      }
      if (_currentElement) {
        _removeClass(_currentElement, _globalConfig.activeClass);
        if (_currentElement !== element) {
          _removeClass(_currentElement, _globalConfig.hoverClass);
        }
      }
      _currentElement = element;
      _addClass(element, _globalConfig.hoverClass);
      var newTitle = element.getAttribute("title") || _globalConfig.title;
      if (typeof newTitle === "string" && newTitle) {
        var htmlBridge = _getHtmlBridge(_flashState.bridge);
        if (htmlBridge) {
          htmlBridge.setAttribute("title", newTitle);
        }
      }
      var useHandCursor = _globalConfig.forceHandCursor === true || _getStyle(element, "cursor") === "pointer";
      _setHandCursor(useHandCursor);
      _reposition();
    };
    var _blur = function() {
      var htmlBridge = _getHtmlBridge(_flashState.bridge);
      if (htmlBridge) {
        htmlBridge.removeAttribute("title");
        htmlBridge.style.left = "0px";
        htmlBridge.style.top = "-9999px";
        htmlBridge.style.width = "1px";
        htmlBridge.style.height = "1px";
      }
      if (_currentElement) {
        _removeClass(_currentElement, _globalConfig.hoverClass);
        _removeClass(_currentElement, _globalConfig.activeClass);
        _currentElement = null;
      }
    };
    var _activeElement = function() {
      return _currentElement || null;
    };
    var _isValidHtml4Id = function(id) {
      return typeof id === "string" && id && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(id);
    };
    var _createEvent = function(event) {
      var eventType;
      if (typeof event === "string" && event) {
        eventType = event;
        event = {};
      } else if (typeof event === "object" && event && typeof event.type === "string" && event.type) {
        eventType = event.type;
      }
      if (!eventType) {
        return;
      }
      eventType = eventType.toLowerCase();
      if (!event.target && (/^(copy|aftercopy|_click)$/.test(eventType) || eventType === "error" && event.name === "clipboard-error")) {
        event.target = _copyTarget;
      }
      _extend(event, {
        type: eventType,
        target: event.target || _currentElement || null,
        relatedTarget: event.relatedTarget || null,
        currentTarget: _flashState && _flashState.bridge || null,
        timeStamp: event.timeStamp || _now() || null
      });
      var msg = _eventMessages[event.type];
      if (event.type === "error" && event.name && msg) {
        msg = msg[event.name];
      }
      if (msg) {
        event.message = msg;
      }
      if (event.type === "ready") {
        _extend(event, {
          target: null,
          version: _flashState.version
        });
      }
      if (event.type === "error") {
        if (_flashStateErrorNameMatchingRegex.test(event.name)) {
          _extend(event, {
            target: null,
            minimumVersion: _minimumFlashVersion
          });
        }
        if (_flashStateEnabledErrorNameMatchingRegex.test(event.name)) {
          _extend(event, {version: _flashState.version});
        }
      }
      if (event.type === "copy") {
        event.clipboardData = {
          setData: ZeroClipboard.setData,
          clearData: ZeroClipboard.clearData
        };
      }
      if (event.type === "aftercopy") {
        event = _mapClipResultsFromFlash(event, _clipDataFormatMap);
      }
      if (event.target && !event.relatedTarget) {
        event.relatedTarget = _getRelatedTarget(event.target);
      }
      return _addMouseData(event);
    };
    var _getRelatedTarget = function(targetEl) {
      var relatedTargetId = targetEl && targetEl.getAttribute && targetEl.getAttribute("data-clipboard-target");
      return relatedTargetId ? _document.getElementById(relatedTargetId) : null;
    };
    var _addMouseData = function(event) {
      if (event && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(event.type)) {
        var srcElement = event.target;
        var fromElement = event.type === "_mouseover" && event.relatedTarget ? event.relatedTarget : undefined;
        var toElement = event.type === "_mouseout" && event.relatedTarget ? event.relatedTarget : undefined;
        var pos = _getElementPosition(srcElement);
        var screenLeft = _window.screenLeft || _window.screenX || 0;
        var screenTop = _window.screenTop || _window.screenY || 0;
        var scrollLeft = _document.body.scrollLeft + _document.documentElement.scrollLeft;
        var scrollTop = _document.body.scrollTop + _document.documentElement.scrollTop;
        var pageX = pos.left + (typeof event._stageX === "number" ? event._stageX : 0);
        var pageY = pos.top + (typeof event._stageY === "number" ? event._stageY : 0);
        var clientX = pageX - scrollLeft;
        var clientY = pageY - scrollTop;
        var screenX = screenLeft + clientX;
        var screenY = screenTop + clientY;
        var moveX = typeof event.movementX === "number" ? event.movementX : 0;
        var moveY = typeof event.movementY === "number" ? event.movementY : 0;
        delete event._stageX;
        delete event._stageY;
        _extend(event, {
          srcElement: srcElement,
          fromElement: fromElement,
          toElement: toElement,
          screenX: screenX,
          screenY: screenY,
          pageX: pageX,
          pageY: pageY,
          clientX: clientX,
          clientY: clientY,
          x: clientX,
          y: clientY,
          movementX: moveX,
          movementY: moveY,
          offsetX: 0,
          offsetY: 0,
          layerX: 0,
          layerY: 0
        });
      }
      return event;
    };
    var _shouldPerformAsync = function(event) {
      var eventType = event && typeof event.type === "string" && event.type || "";
      return !/^(?:(?:before)?copy|destroy)$/.test(eventType);
    };
    var _dispatchCallback = function(func, context, args, async) {
      if (async) {
        _setTimeout(function() {
          func.apply(context, args);
        }, 0);
      } else {
        func.apply(context, args);
      }
    };
    var _dispatchCallbacks = function(event) {
      if (!(typeof event === "object" && event && event.type)) {
        return;
      }
      var async = _shouldPerformAsync(event);
      var wildcardTypeHandlers = _handlers["*"] || [];
      var specificTypeHandlers = _handlers[event.type] || [];
      var handlers = wildcardTypeHandlers.concat(specificTypeHandlers);
      if (handlers && handlers.length) {
        var i,
            len,
            func,
            context,
            eventCopy,
            originalContext = this;
        for (i = 0, len = handlers.length; i < len; i++) {
          func = handlers[i];
          context = originalContext;
          if (typeof func === "string" && typeof _window[func] === "function") {
            func = _window[func];
          }
          if (typeof func === "object" && func && typeof func.handleEvent === "function") {
            context = func;
            func = func.handleEvent;
          }
          if (typeof func === "function") {
            eventCopy = _extend({}, event);
            _dispatchCallback(func, context, [eventCopy], async);
          }
        }
      }
      return this;
    };
    var _getSandboxStatusFromErrorEvent = function(event) {
      var isSandboxed = null;
      if (_pageIsFramed === false || event && event.type === "error" && event.name && _errorsThatOnlyOccurAfterFlashLoads.indexOf(event.name) !== -1) {
        isSandboxed = false;
      }
      return isSandboxed;
    };
    var _preprocessEvent = function(event) {
      var element = event.target || _currentElement || null;
      var sourceIsSwf = event._source === "swf";
      delete event._source;
      switch (event.type) {
        case "error":
          var isSandboxed = event.name === "flash-sandboxed" || _getSandboxStatusFromErrorEvent(event);
          if (typeof isSandboxed === "boolean") {
            _flashState.sandboxed = isSandboxed;
          }
          if (_flashStateErrorNames.indexOf(event.name) !== -1) {
            _extend(_flashState, {
              disabled: event.name === "flash-disabled",
              outdated: event.name === "flash-outdated",
              unavailable: event.name === "flash-unavailable",
              degraded: event.name === "flash-degraded",
              deactivated: event.name === "flash-deactivated",
              overdue: event.name === "flash-overdue",
              ready: false
            });
          } else if (event.name === "version-mismatch") {
            _zcSwfVersion = event.swfVersion;
            _extend(_flashState, {
              disabled: false,
              outdated: false,
              unavailable: false,
              degraded: false,
              deactivated: false,
              overdue: false,
              ready: false
            });
          }
          _clearTimeoutsAndPolling();
          break;
        case "ready":
          _zcSwfVersion = event.swfVersion;
          var wasDeactivated = _flashState.deactivated === true;
          _extend(_flashState, {
            disabled: false,
            outdated: false,
            sandboxed: false,
            unavailable: false,
            degraded: false,
            deactivated: false,
            overdue: wasDeactivated,
            ready: !wasDeactivated
          });
          _clearTimeoutsAndPolling();
          break;
        case "beforecopy":
          _copyTarget = element;
          break;
        case "copy":
          var textContent,
              htmlContent,
              targetEl = event.relatedTarget;
          if (!(_clipData["text/html"] || _clipData["text/plain"]) && targetEl && (htmlContent = targetEl.value || targetEl.outerHTML || targetEl.innerHTML) && (textContent = targetEl.value || targetEl.textContent || targetEl.innerText)) {
            event.clipboardData.clearData();
            event.clipboardData.setData("text/plain", textContent);
            if (htmlContent !== textContent) {
              event.clipboardData.setData("text/html", htmlContent);
            }
          } else if (!_clipData["text/plain"] && event.target && (textContent = event.target.getAttribute("data-clipboard-text"))) {
            event.clipboardData.clearData();
            event.clipboardData.setData("text/plain", textContent);
          }
          break;
        case "aftercopy":
          _queueEmitClipboardErrors(event);
          ZeroClipboard.clearData();
          if (element && element !== _safeActiveElement() && element.focus) {
            element.focus();
          }
          break;
        case "_mouseover":
          ZeroClipboard.focus(element);
          if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
            if (element && element !== event.relatedTarget && !_containedBy(event.relatedTarget, element)) {
              _fireMouseEvent(_extend({}, event, {
                type: "mouseenter",
                bubbles: false,
                cancelable: false
              }));
            }
            _fireMouseEvent(_extend({}, event, {type: "mouseover"}));
          }
          break;
        case "_mouseout":
          ZeroClipboard.blur();
          if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
            if (element && element !== event.relatedTarget && !_containedBy(event.relatedTarget, element)) {
              _fireMouseEvent(_extend({}, event, {
                type: "mouseleave",
                bubbles: false,
                cancelable: false
              }));
            }
            _fireMouseEvent(_extend({}, event, {type: "mouseout"}));
          }
          break;
        case "_mousedown":
          _addClass(element, _globalConfig.activeClass);
          if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
            _fireMouseEvent(_extend({}, event, {type: event.type.slice(1)}));
          }
          break;
        case "_mouseup":
          _removeClass(element, _globalConfig.activeClass);
          if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
            _fireMouseEvent(_extend({}, event, {type: event.type.slice(1)}));
          }
          break;
        case "_click":
          _copyTarget = null;
          if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
            _fireMouseEvent(_extend({}, event, {type: event.type.slice(1)}));
          }
          break;
        case "_mousemove":
          if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
            _fireMouseEvent(_extend({}, event, {type: event.type.slice(1)}));
          }
          break;
      }
      if (/^_(?:click|mouse(?:over|out|down|up|move))$/.test(event.type)) {
        return true;
      }
    };
    var _queueEmitClipboardErrors = function(aftercopyEvent) {
      if (aftercopyEvent.errors && aftercopyEvent.errors.length > 0) {
        var errorEvent = _deepCopy(aftercopyEvent);
        _extend(errorEvent, {
          type: "error",
          name: "clipboard-error"
        });
        delete errorEvent.success;
        _setTimeout(function() {
          ZeroClipboard.emit(errorEvent);
        }, 0);
      }
    };
    var _fireMouseEvent = function(event) {
      if (!(event && typeof event.type === "string" && event)) {
        return;
      }
      var e,
          target = event.target || null,
          doc = target && target.ownerDocument || _document,
          defaults = {
            view: doc.defaultView || _window,
            canBubble: true,
            cancelable: true,
            detail: event.type === "click" ? 1 : 0,
            button: typeof event.which === "number" ? event.which - 1 : typeof event.button === "number" ? event.button : doc.createEvent ? 0 : 1
          },
          args = _extend(defaults, event);
      if (!target) {
        return;
      }
      if (doc.createEvent && target.dispatchEvent) {
        args = [args.type, args.canBubble, args.cancelable, args.view, args.detail, args.screenX, args.screenY, args.clientX, args.clientY, args.ctrlKey, args.altKey, args.shiftKey, args.metaKey, args.button, args.relatedTarget];
        e = doc.createEvent("MouseEvents");
        if (e.initMouseEvent) {
          e.initMouseEvent.apply(e, args);
          e._source = "js";
          target.dispatchEvent(e);
        }
      }
    };
    var _watchForSwfFallbackContent = function() {
      var maxWait = _globalConfig.flashLoadTimeout;
      if (typeof maxWait === "number" && maxWait >= 0) {
        var pollWait = Math.min(1e3, maxWait / 10);
        var fallbackContentId = _globalConfig.swfObjectId + "_fallbackContent";
        _swfFallbackCheckInterval = _setInterval(function() {
          var el = _document.getElementById(fallbackContentId);
          if (_isElementVisible(el)) {
            _clearTimeoutsAndPolling();
            _flashState.deactivated = null;
            ZeroClipboard.emit({
              type: "error",
              name: "swf-not-found"
            });
          }
        }, pollWait);
      }
    };
    var _createHtmlBridge = function() {
      var container = _document.createElement("div");
      container.id = _globalConfig.containerId;
      container.className = _globalConfig.containerClass;
      container.style.position = "absolute";
      container.style.left = "0px";
      container.style.top = "-9999px";
      container.style.width = "1px";
      container.style.height = "1px";
      container.style.zIndex = "" + _getSafeZIndex(_globalConfig.zIndex);
      return container;
    };
    var _getHtmlBridge = function(flashBridge) {
      var htmlBridge = flashBridge && flashBridge.parentNode;
      while (htmlBridge && htmlBridge.nodeName === "OBJECT" && htmlBridge.parentNode) {
        htmlBridge = htmlBridge.parentNode;
      }
      return htmlBridge || null;
    };
    var _embedSwf = function() {
      var len,
          flashBridge = _flashState.bridge,
          container = _getHtmlBridge(flashBridge);
      if (!flashBridge) {
        var allowScriptAccess = _determineScriptAccess(_window.location.host, _globalConfig);
        var allowNetworking = allowScriptAccess === "never" ? "none" : "all";
        var flashvars = _vars(_extend({jsVersion: ZeroClipboard.version}, _globalConfig));
        var swfUrl = _globalConfig.swfPath + _cacheBust(_globalConfig.swfPath, _globalConfig);
        container = _createHtmlBridge();
        var divToBeReplaced = _document.createElement("div");
        container.appendChild(divToBeReplaced);
        _document.body.appendChild(container);
        var tmpDiv = _document.createElement("div");
        var usingActiveX = _flashState.pluginType === "activex";
        tmpDiv.innerHTML = '<object id="' + _globalConfig.swfObjectId + '" name="' + _globalConfig.swfObjectId + '" ' + 'width="100%" height="100%" ' + (usingActiveX ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + swfUrl + '"') + ">" + (usingActiveX ? '<param name="movie" value="' + swfUrl + '"/>' : "") + '<param name="allowScriptAccess" value="' + allowScriptAccess + '"/>' + '<param name="allowNetworking" value="' + allowNetworking + '"/>' + '<param name="menu" value="false"/>' + '<param name="wmode" value="transparent"/>' + '<param name="flashvars" value="' + flashvars + '"/>' + '<div id="' + _globalConfig.swfObjectId + '_fallbackContent">&nbsp;</div>' + "</object>";
        flashBridge = tmpDiv.firstChild;
        tmpDiv = null;
        _unwrap(flashBridge).ZeroClipboard = ZeroClipboard;
        container.replaceChild(flashBridge, divToBeReplaced);
        _watchForSwfFallbackContent();
      }
      if (!flashBridge) {
        flashBridge = _document[_globalConfig.swfObjectId];
        if (flashBridge && (len = flashBridge.length)) {
          flashBridge = flashBridge[len - 1];
        }
        if (!flashBridge && container) {
          flashBridge = container.firstChild;
        }
      }
      _flashState.bridge = flashBridge || null;
      return flashBridge;
    };
    var _unembedSwf = function() {
      var flashBridge = _flashState.bridge;
      if (flashBridge) {
        var htmlBridge = _getHtmlBridge(flashBridge);
        if (htmlBridge) {
          if (_flashState.pluginType === "activex" && "readyState" in flashBridge) {
            flashBridge.style.display = "none";
            (function removeSwfFromIE() {
              if (flashBridge.readyState === 4) {
                for (var prop in flashBridge) {
                  if (typeof flashBridge[prop] === "function") {
                    flashBridge[prop] = null;
                  }
                }
                if (flashBridge.parentNode) {
                  flashBridge.parentNode.removeChild(flashBridge);
                }
                if (htmlBridge.parentNode) {
                  htmlBridge.parentNode.removeChild(htmlBridge);
                }
              } else {
                _setTimeout(removeSwfFromIE, 10);
              }
            })();
          } else {
            if (flashBridge.parentNode) {
              flashBridge.parentNode.removeChild(flashBridge);
            }
            if (htmlBridge.parentNode) {
              htmlBridge.parentNode.removeChild(htmlBridge);
            }
          }
        }
        _clearTimeoutsAndPolling();
        _flashState.ready = null;
        _flashState.bridge = null;
        _flashState.deactivated = null;
        _zcSwfVersion = undefined;
      }
    };
    var _mapClipDataToFlash = function(clipData) {
      var newClipData = {},
          formatMap = {};
      if (!(typeof clipData === "object" && clipData)) {
        return;
      }
      for (var dataFormat in clipData) {
        if (dataFormat && _hasOwn.call(clipData, dataFormat) && typeof clipData[dataFormat] === "string" && clipData[dataFormat]) {
          switch (dataFormat.toLowerCase()) {
            case "text/plain":
            case "text":
            case "air:text":
            case "flash:text":
              newClipData.text = clipData[dataFormat];
              formatMap.text = dataFormat;
              break;
            case "text/html":
            case "html":
            case "air:html":
            case "flash:html":
              newClipData.html = clipData[dataFormat];
              formatMap.html = dataFormat;
              break;
            case "application/rtf":
            case "text/rtf":
            case "rtf":
            case "richtext":
            case "air:rtf":
            case "flash:rtf":
              newClipData.rtf = clipData[dataFormat];
              formatMap.rtf = dataFormat;
              break;
            default:
              break;
          }
        }
      }
      return {
        data: newClipData,
        formatMap: formatMap
      };
    };
    var _mapClipResultsFromFlash = function(clipResults, formatMap) {
      if (!(typeof clipResults === "object" && clipResults && typeof formatMap === "object" && formatMap)) {
        return clipResults;
      }
      var newResults = {};
      for (var prop in clipResults) {
        if (_hasOwn.call(clipResults, prop)) {
          if (prop === "errors") {
            newResults[prop] = clipResults[prop] ? clipResults[prop].slice() : [];
            for (var i = 0,
                len = newResults[prop].length; i < len; i++) {
              newResults[prop][i].format = formatMap[newResults[prop][i].format];
            }
          } else if (prop !== "success" && prop !== "data") {
            newResults[prop] = clipResults[prop];
          } else {
            newResults[prop] = {};
            var tmpHash = clipResults[prop];
            for (var dataFormat in tmpHash) {
              if (dataFormat && _hasOwn.call(tmpHash, dataFormat) && _hasOwn.call(formatMap, dataFormat)) {
                newResults[prop][formatMap[dataFormat]] = tmpHash[dataFormat];
              }
            }
          }
        }
      }
      return newResults;
    };
    var _cacheBust = function(path, options) {
      var cacheBust = options == null || options && options.cacheBust === true;
      if (cacheBust) {
        return (path.indexOf("?") === -1 ? "?" : "&") + "noCache=" + _now();
      } else {
        return "";
      }
    };
    var _vars = function(options) {
      var i,
          len,
          domain,
          domains,
          str = "",
          trustedOriginsExpanded = [];
      if (options.trustedDomains) {
        if (typeof options.trustedDomains === "string") {
          domains = [options.trustedDomains];
        } else if (typeof options.trustedDomains === "object" && "length" in options.trustedDomains) {
          domains = options.trustedDomains;
        }
      }
      if (domains && domains.length) {
        for (i = 0, len = domains.length; i < len; i++) {
          if (_hasOwn.call(domains, i) && domains[i] && typeof domains[i] === "string") {
            domain = _extractDomain(domains[i]);
            if (!domain) {
              continue;
            }
            if (domain === "*") {
              trustedOriginsExpanded.length = 0;
              trustedOriginsExpanded.push(domain);
              break;
            }
            trustedOriginsExpanded.push.apply(trustedOriginsExpanded, [domain, "//" + domain, _window.location.protocol + "//" + domain]);
          }
        }
      }
      if (trustedOriginsExpanded.length) {
        str += "trustedOrigins=" + _encodeURIComponent(trustedOriginsExpanded.join(","));
      }
      if (options.forceEnhancedClipboard === true) {
        str += (str ? "&" : "") + "forceEnhancedClipboard=true";
      }
      if (typeof options.swfObjectId === "string" && options.swfObjectId) {
        str += (str ? "&" : "") + "swfObjectId=" + _encodeURIComponent(options.swfObjectId);
      }
      if (typeof options.jsVersion === "string" && options.jsVersion) {
        str += (str ? "&" : "") + "jsVersion=" + _encodeURIComponent(options.jsVersion);
      }
      return str;
    };
    var _extractDomain = function(originOrUrl) {
      if (originOrUrl == null || originOrUrl === "") {
        return null;
      }
      originOrUrl = originOrUrl.replace(/^\s+|\s+$/g, "");
      if (originOrUrl === "") {
        return null;
      }
      var protocolIndex = originOrUrl.indexOf("//");
      originOrUrl = protocolIndex === -1 ? originOrUrl : originOrUrl.slice(protocolIndex + 2);
      var pathIndex = originOrUrl.indexOf("/");
      originOrUrl = pathIndex === -1 ? originOrUrl : protocolIndex === -1 || pathIndex === 0 ? null : originOrUrl.slice(0, pathIndex);
      if (originOrUrl && originOrUrl.slice(-4).toLowerCase() === ".swf") {
        return null;
      }
      return originOrUrl || null;
    };
    var _determineScriptAccess = function() {
      var _extractAllDomains = function(origins) {
        var i,
            len,
            tmp,
            resultsArray = [];
        if (typeof origins === "string") {
          origins = [origins];
        }
        if (!(typeof origins === "object" && origins && typeof origins.length === "number")) {
          return resultsArray;
        }
        for (i = 0, len = origins.length; i < len; i++) {
          if (_hasOwn.call(origins, i) && (tmp = _extractDomain(origins[i]))) {
            if (tmp === "*") {
              resultsArray.length = 0;
              resultsArray.push("*");
              break;
            }
            if (resultsArray.indexOf(tmp) === -1) {
              resultsArray.push(tmp);
            }
          }
        }
        return resultsArray;
      };
      return function(currentDomain, configOptions) {
        var swfDomain = _extractDomain(configOptions.swfPath);
        if (swfDomain === null) {
          swfDomain = currentDomain;
        }
        var trustedDomains = _extractAllDomains(configOptions.trustedDomains);
        var len = trustedDomains.length;
        if (len > 0) {
          if (len === 1 && trustedDomains[0] === "*") {
            return "always";
          }
          if (trustedDomains.indexOf(currentDomain) !== -1) {
            if (len === 1 && currentDomain === swfDomain) {
              return "sameDomain";
            }
            return "always";
          }
        }
        return "never";
      };
    }();
    var _safeActiveElement = function() {
      try {
        return _document.activeElement;
      } catch (err) {
        return null;
      }
    };
    var _addClass = function(element, value) {
      var c,
          cl,
          className,
          classNames = [];
      if (typeof value === "string" && value) {
        classNames = value.split(/\s+/);
      }
      if (element && element.nodeType === 1 && classNames.length > 0) {
        if (element.classList) {
          for (c = 0, cl = classNames.length; c < cl; c++) {
            element.classList.add(classNames[c]);
          }
        } else if (element.hasOwnProperty("className")) {
          className = " " + element.className + " ";
          for (c = 0, cl = classNames.length; c < cl; c++) {
            if (className.indexOf(" " + classNames[c] + " ") === -1) {
              className += classNames[c] + " ";
            }
          }
          element.className = className.replace(/^\s+|\s+$/g, "");
        }
      }
      return element;
    };
    var _removeClass = function(element, value) {
      var c,
          cl,
          className,
          classNames = [];
      if (typeof value === "string" && value) {
        classNames = value.split(/\s+/);
      }
      if (element && element.nodeType === 1 && classNames.length > 0) {
        if (element.classList && element.classList.length > 0) {
          for (c = 0, cl = classNames.length; c < cl; c++) {
            element.classList.remove(classNames[c]);
          }
        } else if (element.className) {
          className = (" " + element.className + " ").replace(/[\r\n\t]/g, " ");
          for (c = 0, cl = classNames.length; c < cl; c++) {
            className = className.replace(" " + classNames[c] + " ", " ");
          }
          element.className = className.replace(/^\s+|\s+$/g, "");
        }
      }
      return element;
    };
    var _getStyle = function(el, prop) {
      var value = _getComputedStyle(el, null).getPropertyValue(prop);
      if (prop === "cursor") {
        if (!value || value === "auto") {
          if (el.nodeName === "A") {
            return "pointer";
          }
        }
      }
      return value;
    };
    var _getElementPosition = function(el) {
      var pos = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
      if (el.getBoundingClientRect) {
        var elRect = el.getBoundingClientRect();
        var pageXOffset = _window.pageXOffset;
        var pageYOffset = _window.pageYOffset;
        var leftBorderWidth = _document.documentElement.clientLeft || 0;
        var topBorderWidth = _document.documentElement.clientTop || 0;
        var leftBodyOffset = 0;
        var topBodyOffset = 0;
        if (_getStyle(_document.body, "position") === "relative") {
          var bodyRect = _document.body.getBoundingClientRect();
          var htmlRect = _document.documentElement.getBoundingClientRect();
          leftBodyOffset = bodyRect.left - htmlRect.left || 0;
          topBodyOffset = bodyRect.top - htmlRect.top || 0;
        }
        pos.left = elRect.left + pageXOffset - leftBorderWidth - leftBodyOffset;
        pos.top = elRect.top + pageYOffset - topBorderWidth - topBodyOffset;
        pos.width = "width" in elRect ? elRect.width : elRect.right - elRect.left;
        pos.height = "height" in elRect ? elRect.height : elRect.bottom - elRect.top;
      }
      return pos;
    };
    var _isElementVisible = function(el) {
      if (!el) {
        return false;
      }
      var styles = _getComputedStyle(el, null);
      var hasCssHeight = _parseFloat(styles.height) > 0;
      var hasCssWidth = _parseFloat(styles.width) > 0;
      var hasCssTop = _parseFloat(styles.top) >= 0;
      var hasCssLeft = _parseFloat(styles.left) >= 0;
      var cssKnows = hasCssHeight && hasCssWidth && hasCssTop && hasCssLeft;
      var rect = cssKnows ? null : _getElementPosition(el);
      var isVisible = styles.display !== "none" && styles.visibility !== "collapse" && (cssKnows || !!rect && (hasCssHeight || rect.height > 0) && (hasCssWidth || rect.width > 0) && (hasCssTop || rect.top >= 0) && (hasCssLeft || rect.left >= 0));
      return isVisible;
    };
    var _clearTimeoutsAndPolling = function() {
      _clearTimeout(_flashCheckTimeout);
      _flashCheckTimeout = 0;
      _clearInterval(_swfFallbackCheckInterval);
      _swfFallbackCheckInterval = 0;
    };
    var _reposition = function() {
      var htmlBridge;
      if (_currentElement && (htmlBridge = _getHtmlBridge(_flashState.bridge))) {
        var pos = _getElementPosition(_currentElement);
        _extend(htmlBridge.style, {
          width: pos.width + "px",
          height: pos.height + "px",
          top: pos.top + "px",
          left: pos.left + "px",
          zIndex: "" + _getSafeZIndex(_globalConfig.zIndex)
        });
      }
    };
    var _setHandCursor = function(enabled) {
      if (_flashState.ready === true) {
        if (_flashState.bridge && typeof _flashState.bridge.setHandCursor === "function") {
          _flashState.bridge.setHandCursor(enabled);
        } else {
          _flashState.ready = false;
        }
      }
    };
    var _getSafeZIndex = function(val) {
      if (/^(?:auto|inherit)$/.test(val)) {
        return val;
      }
      var zIndex;
      if (typeof val === "number" && !_isNaN(val)) {
        zIndex = val;
      } else if (typeof val === "string") {
        zIndex = _getSafeZIndex(_parseInt(val, 10));
      }
      return typeof zIndex === "number" ? zIndex : "auto";
    };
    var _detectSandbox = function(doNotReassessFlashSupport) {
      var effectiveScriptOrigin,
          frame,
          frameError,
          previousState = _flashState.sandboxed,
          isSandboxed = null;
      doNotReassessFlashSupport = doNotReassessFlashSupport === true;
      if (_pageIsFramed === false) {
        isSandboxed = false;
      } else {
        try {
          frame = window.frameElement || null;
        } catch (e) {
          frameError = {
            name: e.name,
            message: e.message
          };
        }
        if (frame && frame.nodeType === 1 && frame.nodeName === "IFRAME") {
          try {
            isSandboxed = frame.hasAttribute("sandbox");
          } catch (e) {
            isSandboxed = null;
          }
        } else {
          try {
            effectiveScriptOrigin = document.domain || null;
          } catch (e) {
            effectiveScriptOrigin = null;
          }
          if (effectiveScriptOrigin === null || frameError && frameError.name === "SecurityError" && /(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(frameError.message.toLowerCase())) {
            isSandboxed = true;
          }
        }
      }
      _flashState.sandboxed = isSandboxed;
      if (previousState !== isSandboxed && !doNotReassessFlashSupport) {
        _detectFlashSupport(_ActiveXObject);
      }
      return isSandboxed;
    };
    var _detectFlashSupport = function(ActiveXObject) {
      var plugin,
          ax,
          mimeType,
          hasFlash = false,
          isActiveX = false,
          isPPAPI = false,
          flashVersion = "";
      function parseFlashVersion(desc) {
        var matches = desc.match(/[\d]+/g);
        matches.length = 3;
        return matches.join(".");
      }
      function isPepperFlash(flashPlayerFileName) {
        return !!flashPlayerFileName && (flashPlayerFileName = flashPlayerFileName.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(flashPlayerFileName) || flashPlayerFileName.slice(-13) === "chrome.plugin");
      }
      function inspectPlugin(plugin) {
        if (plugin) {
          hasFlash = true;
          if (plugin.version) {
            flashVersion = parseFlashVersion(plugin.version);
          }
          if (!flashVersion && plugin.description) {
            flashVersion = parseFlashVersion(plugin.description);
          }
          if (plugin.filename) {
            isPPAPI = isPepperFlash(plugin.filename);
          }
        }
      }
      if (_navigator.plugins && _navigator.plugins.length) {
        plugin = _navigator.plugins["Shockwave Flash"];
        inspectPlugin(plugin);
        if (_navigator.plugins["Shockwave Flash 2.0"]) {
          hasFlash = true;
          flashVersion = "2.0.0.11";
        }
      } else if (_navigator.mimeTypes && _navigator.mimeTypes.length) {
        mimeType = _navigator.mimeTypes["application/x-shockwave-flash"];
        plugin = mimeType && mimeType.enabledPlugin;
        inspectPlugin(plugin);
      } else if (typeof ActiveXObject !== "undefined") {
        isActiveX = true;
        try {
          ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
          hasFlash = true;
          flashVersion = parseFlashVersion(ax.GetVariable("$version"));
        } catch (e1) {
          try {
            ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            hasFlash = true;
            flashVersion = "6.0.21";
          } catch (e2) {
            try {
              ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
              hasFlash = true;
              flashVersion = parseFlashVersion(ax.GetVariable("$version"));
            } catch (e3) {
              isActiveX = false;
            }
          }
        }
      }
      _flashState.disabled = hasFlash !== true;
      _flashState.outdated = flashVersion && _parseFloat(flashVersion) < _parseFloat(_minimumFlashVersion);
      _flashState.version = flashVersion || "0.0.0";
      _flashState.pluginType = isPPAPI ? "pepper" : isActiveX ? "activex" : hasFlash ? "netscape" : "unknown";
    };
    _detectFlashSupport(_ActiveXObject);
    _detectSandbox(true);
    var ZeroClipboard = function() {
      if (!(this instanceof ZeroClipboard)) {
        return new ZeroClipboard();
      }
      if (typeof ZeroClipboard._createClient === "function") {
        ZeroClipboard._createClient.apply(this, _args(arguments));
      }
    };
    _defineProperty(ZeroClipboard, "version", {
      value: "2.2.0",
      writable: false,
      configurable: true,
      enumerable: true
    });
    ZeroClipboard.config = function() {
      return _config.apply(this, _args(arguments));
    };
    ZeroClipboard.state = function() {
      return _state.apply(this, _args(arguments));
    };
    ZeroClipboard.isFlashUnusable = function() {
      return _isFlashUnusable.apply(this, _args(arguments));
    };
    ZeroClipboard.on = function() {
      return _on.apply(this, _args(arguments));
    };
    ZeroClipboard.off = function() {
      return _off.apply(this, _args(arguments));
    };
    ZeroClipboard.handlers = function() {
      return _listeners.apply(this, _args(arguments));
    };
    ZeroClipboard.emit = function() {
      return _emit.apply(this, _args(arguments));
    };
    ZeroClipboard.create = function() {
      return _create.apply(this, _args(arguments));
    };
    ZeroClipboard.destroy = function() {
      return _destroy.apply(this, _args(arguments));
    };
    ZeroClipboard.setData = function() {
      return _setData.apply(this, _args(arguments));
    };
    ZeroClipboard.clearData = function() {
      return _clearData.apply(this, _args(arguments));
    };
    ZeroClipboard.getData = function() {
      return _getData.apply(this, _args(arguments));
    };
    ZeroClipboard.focus = ZeroClipboard.activate = function() {
      return _focus.apply(this, _args(arguments));
    };
    ZeroClipboard.blur = ZeroClipboard.deactivate = function() {
      return _blur.apply(this, _args(arguments));
    };
    ZeroClipboard.activeElement = function() {
      return _activeElement.apply(this, _args(arguments));
    };
    if (typeof define === "function" && define.amd) {
      define(function() {
        return ZeroClipboard;
      });
    } else if (typeof module === "object" && module && typeof module.exports === "object" && module.exports) {
      module.exports = ZeroClipboard;
    } else {
      window.ZeroClipboard = ZeroClipboard;
    }
  })(function() {
    return this || window;
  }());
})(require('process'));
