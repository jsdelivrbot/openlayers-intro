/* */ 
(function(process) {
  goog.provide('ol.source.Raster');
  goog.require('ol');
  goog.require('ol.ImageCanvas');
  goog.require('ol.TileQueue');
  goog.require('ol.dom');
  goog.require('ol.events');
  goog.require('ol.events.Event');
  goog.require('ol.events.EventType');
  goog.require('ol.ext.pixelworks');
  goog.require('ol.extent');
  goog.require('ol.layer.Image');
  goog.require('ol.layer.Tile');
  goog.require('ol.obj');
  goog.require('ol.renderer.canvas.ImageLayer');
  goog.require('ol.renderer.canvas.TileLayer');
  goog.require('ol.source.Image');
  goog.require('ol.source.RasterOperationType');
  goog.require('ol.source.State');
  goog.require('ol.source.Tile');
  goog.require('ol.transform');
  ol.source.Raster = function(options) {
    this.worker_ = null;
    this.operationType_ = options.operationType !== undefined ? options.operationType : ol.source.RasterOperationType.PIXEL;
    this.threads_ = options.threads !== undefined ? options.threads : 1;
    this.renderers_ = ol.source.Raster.createRenderers_(options.sources);
    for (var r = 0,
        rr = this.renderers_.length; r < rr; ++r) {
      ol.events.listen(this.renderers_[r], ol.events.EventType.CHANGE, this.changed, this);
    }
    this.canvasContext_ = ol.dom.createCanvasContext2D();
    this.tileQueue_ = new ol.TileQueue(function() {
      return 1;
    }, this.changed.bind(this));
    var layerStatesArray = ol.source.Raster.getLayerStatesArray_(this.renderers_);
    var layerStates = {};
    for (var i = 0,
        ii = layerStatesArray.length; i < ii; ++i) {
      layerStates[ol.getUid(layerStatesArray[i].layer)] = layerStatesArray[i];
    }
    this.renderedState_ = null;
    this.renderedImageCanvas_ = null;
    this.frameState_ = {
      animate: false,
      attributions: {},
      coordinateToPixelTransform: ol.transform.create(),
      extent: null,
      focus: null,
      index: 0,
      layerStates: layerStates,
      layerStatesArray: layerStatesArray,
      logos: {},
      pixelRatio: 1,
      pixelToCoordinateTransform: ol.transform.create(),
      postRenderFunctions: [],
      size: [0, 0],
      skippedFeatureUids: {},
      tileQueue: this.tileQueue_,
      time: Date.now(),
      usedTiles: {},
      viewState: ({rotation: 0}),
      viewHints: [],
      wantedTiles: {}
    };
    ol.source.Image.call(this, {});
    if (options.operation !== undefined) {
      this.setOperation(options.operation, options.lib);
    }
  };
  ol.inherits(ol.source.Raster, ol.source.Image);
  ol.source.Raster.prototype.setOperation = function(operation, opt_lib) {
    this.worker_ = new ol.ext.pixelworks.Processor({
      operation: operation,
      imageOps: this.operationType_ === ol.source.RasterOperationType.IMAGE,
      queue: 1,
      lib: opt_lib,
      threads: this.threads_
    });
    this.changed();
  };
  ol.source.Raster.prototype.updateFrameState_ = function(extent, resolution, projection) {
    var frameState = (ol.obj.assign({}, this.frameState_));
    frameState.viewState = (ol.obj.assign({}, frameState.viewState));
    var center = ol.extent.getCenter(extent);
    var width = Math.round(ol.extent.getWidth(extent) / resolution);
    var height = Math.round(ol.extent.getHeight(extent) / resolution);
    frameState.extent = extent;
    frameState.focus = ol.extent.getCenter(extent);
    frameState.size[0] = width;
    frameState.size[1] = height;
    var viewState = frameState.viewState;
    viewState.center = center;
    viewState.projection = projection;
    viewState.resolution = resolution;
    return frameState;
  };
  ol.source.Raster.prototype.isDirty_ = function(extent, resolution) {
    var state = this.renderedState_;
    return !state || this.getRevision() !== state.revision || resolution !== state.resolution || !ol.extent.equals(extent, state.extent);
  };
  ol.source.Raster.prototype.getImage = function(extent, resolution, pixelRatio, projection) {
    if (!this.allSourcesReady_()) {
      return null;
    }
    var currentExtent = extent.slice();
    if (!this.isDirty_(currentExtent, resolution)) {
      return this.renderedImageCanvas_;
    }
    var context = this.canvasContext_;
    var canvas = context.canvas;
    var width = Math.round(ol.extent.getWidth(currentExtent) / resolution);
    var height = Math.round(ol.extent.getHeight(currentExtent) / resolution);
    if (width !== canvas.width || height !== canvas.height) {
      canvas.width = width;
      canvas.height = height;
    }
    var frameState = this.updateFrameState_(currentExtent, resolution, projection);
    var imageCanvas = new ol.ImageCanvas(currentExtent, resolution, 1, this.getAttributions(), canvas, this.composeFrame_.bind(this, frameState));
    this.renderedImageCanvas_ = imageCanvas;
    this.renderedState_ = {
      extent: currentExtent,
      resolution: resolution,
      revision: this.getRevision()
    };
    return imageCanvas;
  };
  ol.source.Raster.prototype.allSourcesReady_ = function() {
    var ready = true;
    var source;
    for (var i = 0,
        ii = this.renderers_.length; i < ii; ++i) {
      source = this.renderers_[i].getLayer().getSource();
      if (source.getState() !== ol.source.State.READY) {
        ready = false;
        break;
      }
    }
    return ready;
  };
  ol.source.Raster.prototype.composeFrame_ = function(frameState, callback) {
    var len = this.renderers_.length;
    var imageDatas = new Array(len);
    for (var i = 0; i < len; ++i) {
      var imageData = ol.source.Raster.getImageData_(this.renderers_[i], frameState, frameState.layerStatesArray[i]);
      if (imageData) {
        imageDatas[i] = imageData;
      } else {
        imageDatas = null;
        break;
      }
    }
    if (imageDatas) {
      var data = {};
      this.dispatchEvent(new ol.source.Raster.Event(ol.source.Raster.EventType_.BEFOREOPERATIONS, frameState, data));
      this.worker_.process(imageDatas, data, this.onWorkerComplete_.bind(this, frameState, callback));
    }
    frameState.tileQueue.loadMoreTiles(16, 16);
  };
  ol.source.Raster.prototype.onWorkerComplete_ = function(frameState, callback, err, output, data) {
    if (err) {
      callback(err);
      return;
    }
    if (!output) {
      return;
    }
    this.dispatchEvent(new ol.source.Raster.Event(ol.source.Raster.EventType_.AFTEROPERATIONS, frameState, data));
    var resolution = frameState.viewState.resolution / frameState.pixelRatio;
    if (!this.isDirty_(frameState.extent, resolution)) {
      this.canvasContext_.putImageData(output, 0, 0);
    }
    callback(null);
  };
  ol.source.Raster.getImageData_ = function(renderer, frameState, layerState) {
    if (!renderer.prepareFrame(frameState, layerState)) {
      return null;
    }
    var width = frameState.size[0];
    var height = frameState.size[1];
    if (!ol.source.Raster.context_) {
      ol.source.Raster.context_ = ol.dom.createCanvasContext2D(width, height);
    } else {
      var canvas = ol.source.Raster.context_.canvas;
      if (canvas.width !== width || canvas.height !== height) {
        ol.source.Raster.context_ = ol.dom.createCanvasContext2D(width, height);
      } else {
        ol.source.Raster.context_.clearRect(0, 0, width, height);
      }
    }
    renderer.composeFrame(frameState, layerState, ol.source.Raster.context_);
    return ol.source.Raster.context_.getImageData(0, 0, width, height);
  };
  ol.source.Raster.context_ = null;
  ol.source.Raster.getLayerStatesArray_ = function(renderers) {
    return renderers.map(function(renderer) {
      return renderer.getLayer().getLayerState();
    });
  };
  ol.source.Raster.createRenderers_ = function(sources) {
    var len = sources.length;
    var renderers = new Array(len);
    for (var i = 0; i < len; ++i) {
      renderers[i] = ol.source.Raster.createRenderer_(sources[i]);
    }
    return renderers;
  };
  ol.source.Raster.createRenderer_ = function(source) {
    var renderer = null;
    if (source instanceof ol.source.Tile) {
      renderer = ol.source.Raster.createTileRenderer_(source);
    } else if (source instanceof ol.source.Image) {
      renderer = ol.source.Raster.createImageRenderer_(source);
    }
    return renderer;
  };
  ol.source.Raster.createImageRenderer_ = function(source) {
    var layer = new ol.layer.Image({source: source});
    return new ol.renderer.canvas.ImageLayer(layer);
  };
  ol.source.Raster.createTileRenderer_ = function(source) {
    var layer = new ol.layer.Tile({source: source});
    return new ol.renderer.canvas.TileLayer(layer);
  };
  ol.source.Raster.Event = function(type, frameState, data) {
    ol.events.Event.call(this, type);
    this.extent = frameState.extent;
    this.resolution = frameState.viewState.resolution / frameState.pixelRatio;
    this.data = data;
  };
  ol.inherits(ol.source.Raster.Event, ol.events.Event);
  ol.source.Raster.prototype.getImageInternal = function() {
    return null;
  };
  ol.source.Raster.EventType_ = {
    BEFOREOPERATIONS: 'beforeoperations',
    AFTEROPERATIONS: 'afteroperations'
  };
})(require('process'));
