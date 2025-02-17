/* */ 
"format cjs";
export var name = "d3";
export var version = "4.7.4";
export var description = "Data-Driven Documents";
export var keywords = ["dom","visualization","svg","animation","canvas"];
export var homepage = "https://d3js.org";
export var license = "BSD-3-Clause";
export var author = {"name":"Mike Bostock","url":"https://bost.ocks.org/mike"};
export var main = "build/d3.node.js";
export var browser = "build/d3.js";
export var module = "index";
export var repository = {"type":"git","url":"https://github.com/d3/d3.git"};
export var scripts = {"pretest":"rimraf build && mkdir build && json2module package.json > build/package.js && node rollup.node","test":"tape 'test/**/*-test.js'","prepublish":"npm run test && rollup -c --banner \"$(preamble)\" -f umd -n d3 -o build/d3.js -- index.js && uglifyjs --preamble \"$(preamble)\" build/d3.js -c negate_iife=false -m -o build/d3.min.js","postpublish":"git push && git push --tags && cd ../d3.github.com && git pull && cp ../d3/build/d3.js d3.v4.js && cp ../d3/build/d3.min.js d3.v4.min.js && git add d3.v4.js d3.v4.min.js && git commit -m \"d3 ${npm_package_version}\" && git push && cd - && cd ../d3-bower && git pull && cp ../d3/LICENSE ../d3/README.md ../d3/build/d3.js ../d3/build/d3.min.js . && git add -- LICENSE README.md d3.js d3.min.js && git commit -m \"${npm_package_version}\" && git tag -am \"${npm_package_version}\" v${npm_package_version} && git push && git push --tags && cd - && zip -j build/d3.zip -- LICENSE README.md API.md CHANGES.md build/d3.js build/d3.min.js"};
export var devDependencies = {"json2module":"0.0","package-preamble":"0.0","rimraf":"2","rollup":"^0.41.4","rollup-plugin-ascii":"0.0","rollup-plugin-node-resolve":"2","tape":"4","uglify-js":"^2.8.11"};
export var dependencies = {"d3-array":"1.1.1","d3-axis":"1.0.6","d3-brush":"1.0.4","d3-chord":"1.0.4","d3-collection":"1.0.3","d3-color":"1.0.3","d3-dispatch":"1.0.3","d3-drag":"1.0.4","d3-dsv":"1.0.5","d3-ease":"1.0.3","d3-force":"1.0.6","d3-format":"1.1.1","d3-geo":"1.6.3","d3-hierarchy":"1.1.4","d3-interpolate":"1.1.4","d3-path":"1.0.5","d3-polygon":"1.0.3","d3-quadtree":"1.0.3","d3-queue":"3.0.5","d3-random":"1.0.3","d3-request":"1.0.5","d3-scale":"1.0.5","d3-selection":"1.0.5","d3-shape":"1.0.6","d3-time":"1.0.6","d3-time-format":"2.0.5","d3-timer":"1.0.5","d3-transition":"1.0.4","d3-voronoi":"1.1.2","d3-zoom":"1.1.4"};
