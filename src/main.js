import ol from "openlayers";
import hljs from "highlight.js";
import * as d3 from "d3";
import "openlayers/css/ol.css!"

hljs.initHighlighting();

let viewCenter = [828176.4324327, 5934540.317516159];
let denmarkCenter = [1054310.920350848,7586500.221287746]

let view = new ol.View({});
let osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

let map = new ol.Map({
    target: "map",
    layers: [
        osmLayer
    ],
    view: view
});

let mapEl = document.getElementById("map");

console.log()

let style2 = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 7,
        stroke: new ol.style.Stroke({color: "blue", width: 6})
    })
});

let stroke = new ol.style.Stroke({color: "blue", width: 3})
let image = new ol.style.Circle({
    radius: 6,
    stroke: stroke
});
let style = new ol.style.Style({
    image: image
});


let simplePoint = new ol.Feature({
    geometry: new ol.geom.Point(viewCenter)
});

let simplePointSource = new ol.source.Vector({
    features: [simplePoint]
})


let simplePointLayer = new ol.layer.Vector({
    style: style2,
    source: simplePointSource
})

let format = new ol.format.GeoJSON();
let url = 'renewable_power_plants_DK.geojson';
let originalSource = new ol.source.Vector({
    url: url,
    format: format
})

let originalLayer = new ol.layer.Vector({
    title: "Renewables Denmark",
    source: originalSource,
    style: style
})

let clusterSource = new ol.source.Cluster({
    source: originalSource
})

let styleCache={};
let clusterLayer = new ol.layer.Vector({
    source: clusterSource,
    // style: style
    style: function(feature) {
        var size = feature.get('features').length;
        var style = styleCache[size];
        if (!style) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 10,
                    stroke: new ol.style.Stroke({
                        color: '#fff'
                    }),
                    fill: new ol.style.Fill({
                        color: '#3399CC'
                    })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: new ol.style.Fill({
                        color: '#fff'
                    })
                })
            });
            styleCache[size] = style;
        }
        return style;
    }
});



map.on('click', event => console.log(event.coordinate));

document.getElementById("osm").addEventListener("impress:stepenter", function() {
    if (mapEl.classList.contains("hidden")) {
        mapEl.classList.remove("hidden")
    }
    view.setCenter([0, 0]);
    view.setZoom(4);
})
document.getElementById("changeView").addEventListener("impress:stepenter", function() {
    setTimeout( function() {
        view.setCenter(viewCenter);
        view.setZoom(18);
    }, 2000)
})
document.getElementById("addPoint").addEventListener("impress:stepenter", function() {
    setTimeout( function() {
        view.setCenter(viewCenter);
        view.setZoom(18);
        map.addLayer(simplePointLayer);
    }, 2000)
})
document.getElementById("addPoint").addEventListener("impress:stepleave", function() {
    // map.removeLayer(simplePointLayer);
    map.removeLayer(map.getLayerGroup[1]);
})

document.getElementById("addData").addEventListener("impress:stepenter", function() {
    view.setCenter(denmarkCenter);
    view.setZoom(7);
    map.addLayer(clusterLayer);
})

document.getElementById("addData").addEventListener("impress:stepleave", function() {
    map.removeLayer(map.getLayerGroup[1]);
    mapEl.classList.add("hidden");

})
