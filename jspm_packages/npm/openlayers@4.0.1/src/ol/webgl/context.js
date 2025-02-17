/* */ 
(function(Buffer) {
  goog.provide('ol.webgl.Context');
  goog.require('ol');
  goog.require('ol.Disposable');
  goog.require('ol.array');
  goog.require('ol.events');
  goog.require('ol.obj');
  goog.require('ol.webgl');
  goog.require('ol.webgl.ContextEventType');
  if (ol.ENABLE_WEBGL) {
    ol.webgl.Context = function(canvas, gl) {
      this.canvas_ = canvas;
      this.gl_ = gl;
      this.bufferCache_ = {};
      this.shaderCache_ = {};
      this.programCache_ = {};
      this.currentProgram_ = null;
      this.hitDetectionFramebuffer_ = null;
      this.hitDetectionTexture_ = null;
      this.hitDetectionRenderbuffer_ = null;
      this.hasOESElementIndexUint = ol.array.includes(ol.WEBGL_EXTENSIONS, 'OES_element_index_uint');
      if (this.hasOESElementIndexUint) {
        gl.getExtension('OES_element_index_uint');
      }
      ol.events.listen(this.canvas_, ol.webgl.ContextEventType.LOST, this.handleWebGLContextLost, this);
      ol.events.listen(this.canvas_, ol.webgl.ContextEventType.RESTORED, this.handleWebGLContextRestored, this);
    };
    ol.inherits(ol.webgl.Context, ol.Disposable);
    ol.webgl.Context.prototype.bindBuffer = function(target, buf) {
      var gl = this.getGL();
      var arr = buf.getArray();
      var bufferKey = String(ol.getUid(buf));
      if (bufferKey in this.bufferCache_) {
        var bufferCacheEntry = this.bufferCache_[bufferKey];
        gl.bindBuffer(target, bufferCacheEntry.buffer);
      } else {
        var buffer = gl.createBuffer();
        gl.bindBuffer(target, buffer);
        var arrayBuffer;
        if (target == ol.webgl.ARRAY_BUFFER) {
          arrayBuffer = new Float32Array(arr);
        } else if (target == ol.webgl.ELEMENT_ARRAY_BUFFER) {
          arrayBuffer = this.hasOESElementIndexUint ? new Uint32Array(arr) : new Uint16Array(arr);
        }
        gl.bufferData(target, arrayBuffer, buf.getUsage());
        this.bufferCache_[bufferKey] = {
          buf: buf,
          buffer: buffer
        };
      }
    };
    ol.webgl.Context.prototype.deleteBuffer = function(buf) {
      var gl = this.getGL();
      var bufferKey = String(ol.getUid(buf));
      var bufferCacheEntry = this.bufferCache_[bufferKey];
      if (!gl.isContextLost()) {
        gl.deleteBuffer(bufferCacheEntry.buffer);
      }
      delete this.bufferCache_[bufferKey];
    };
    ol.webgl.Context.prototype.disposeInternal = function() {
      ol.events.unlistenAll(this.canvas_);
      var gl = this.getGL();
      if (!gl.isContextLost()) {
        var key;
        for (key in this.bufferCache_) {
          gl.deleteBuffer(this.bufferCache_[key].buffer);
        }
        for (key in this.programCache_) {
          gl.deleteProgram(this.programCache_[key]);
        }
        for (key in this.shaderCache_) {
          gl.deleteShader(this.shaderCache_[key]);
        }
        gl.deleteFramebuffer(this.hitDetectionFramebuffer_);
        gl.deleteRenderbuffer(this.hitDetectionRenderbuffer_);
        gl.deleteTexture(this.hitDetectionTexture_);
      }
    };
    ol.webgl.Context.prototype.getCanvas = function() {
      return this.canvas_;
    };
    ol.webgl.Context.prototype.getGL = function() {
      return this.gl_;
    };
    ol.webgl.Context.prototype.getHitDetectionFramebuffer = function() {
      if (!this.hitDetectionFramebuffer_) {
        this.initHitDetectionFramebuffer_();
      }
      return this.hitDetectionFramebuffer_;
    };
    ol.webgl.Context.prototype.getShader = function(shaderObject) {
      var shaderKey = String(ol.getUid(shaderObject));
      if (shaderKey in this.shaderCache_) {
        return this.shaderCache_[shaderKey];
      } else {
        var gl = this.getGL();
        var shader = gl.createShader(shaderObject.getType());
        gl.shaderSource(shader, shaderObject.getSource());
        gl.compileShader(shader);
        this.shaderCache_[shaderKey] = shader;
        return shader;
      }
    };
    ol.webgl.Context.prototype.getProgram = function(fragmentShaderObject, vertexShaderObject) {
      var programKey = ol.getUid(fragmentShaderObject) + '/' + ol.getUid(vertexShaderObject);
      if (programKey in this.programCache_) {
        return this.programCache_[programKey];
      } else {
        var gl = this.getGL();
        var program = gl.createProgram();
        gl.attachShader(program, this.getShader(fragmentShaderObject));
        gl.attachShader(program, this.getShader(vertexShaderObject));
        gl.linkProgram(program);
        this.programCache_[programKey] = program;
        return program;
      }
    };
    ol.webgl.Context.prototype.handleWebGLContextLost = function() {
      ol.obj.clear(this.bufferCache_);
      ol.obj.clear(this.shaderCache_);
      ol.obj.clear(this.programCache_);
      this.currentProgram_ = null;
      this.hitDetectionFramebuffer_ = null;
      this.hitDetectionTexture_ = null;
      this.hitDetectionRenderbuffer_ = null;
    };
    ol.webgl.Context.prototype.handleWebGLContextRestored = function() {};
    ol.webgl.Context.prototype.initHitDetectionFramebuffer_ = function() {
      var gl = this.gl_;
      var framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      var texture = ol.webgl.Context.createEmptyTexture(gl, 1, 1);
      var renderbuffer = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 1, 1);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.bindRenderbuffer(gl.RENDERBUFFER, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      this.hitDetectionFramebuffer_ = framebuffer;
      this.hitDetectionTexture_ = texture;
      this.hitDetectionRenderbuffer_ = renderbuffer;
    };
    ol.webgl.Context.prototype.useProgram = function(program) {
      if (program == this.currentProgram_) {
        return false;
      } else {
        var gl = this.getGL();
        gl.useProgram(program);
        this.currentProgram_ = program;
        return true;
      }
    };
    ol.webgl.Context.createTexture_ = function(gl, opt_wrapS, opt_wrapT) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      if (opt_wrapS !== undefined) {
        gl.texParameteri(ol.webgl.TEXTURE_2D, ol.webgl.TEXTURE_WRAP_S, opt_wrapS);
      }
      if (opt_wrapT !== undefined) {
        gl.texParameteri(ol.webgl.TEXTURE_2D, ol.webgl.TEXTURE_WRAP_T, opt_wrapT);
      }
      return texture;
    };
    ol.webgl.Context.createEmptyTexture = function(gl, width, height, opt_wrapS, opt_wrapT) {
      var texture = ol.webgl.Context.createTexture_(gl, opt_wrapS, opt_wrapT);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      return texture;
    };
    ol.webgl.Context.createTexture = function(gl, image, opt_wrapS, opt_wrapT) {
      var texture = ol.webgl.Context.createTexture_(gl, opt_wrapS, opt_wrapT);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      return texture;
    };
  }
})(require('buffer').Buffer);
