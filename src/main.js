import ol from "openlayers";
import hljs from "highlight.js";
import * as d3 from "d3";
import "openlayers/css/ol.css!"

hljs.initHighlighting();

let map = new ol.Map({
    target: "map",
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        clusterLayer
    ],
    view: new ol.View({
        center: [115817734252.48119, 7614510.238026799],
        zoom: 7
    })
});

// d3.csv("renewable_power_plants_DK.csv", function(error, data) {
    // if (error) throw error;
    // let filteredData = data.filter( row => (row.long!=="" && row.lat!==""))
    //
    // let features = filteredData.map( (row,index,all) => new ol.Feature({
    //     name: "name"+index,
    //     geometry: new ol.geom.Point(ol.proj.transform([Number(row.lon), Number(row.lat)], "EPSG:4326", "EPSG:3857"))
    // }))

let stroke = new ol.style.Stroke({color: "blue", width: 3})
let image = new ol.style.Circle({
    radius: 6,
    stroke: stroke
});
let style = new ol.style.Style({
    image: image
});

// let originalSource = new ol.source.Vector({
//     features: features
// })
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


// })
