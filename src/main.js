import ol from "openlayers";
import hljs from "highlight.js";
import * as d3 from "d3";

hljs.initHighlighting();

d3.csv("renewable_power_plants_DK.csv", function(error, data) {
    if (error) throw error;
    let filteredData = data.filter( row => (row.long!=="" && row.lat!==""))

    let features = filteredData.map( (row,index,all) => new ol.Feature({
        name: "name"+index,
        geometry: new ol.geom.Point(ol.proj.transform([row.lon, row.lat], "EPSG:4326", "EPSG:3857"))
    }))

    let stroke = new ol.style.Stroke({color: "blue", width: 3})
    let image = new ol.style.Circle({
        radius: 6,
        stroke: stroke
    });
    let style = new ol.style.Style({
        image: image
    });

    let originalSource = new ol.source.Vector({
        features: features
    })

    let originalLayer = new ol.layer.Vector({
        title: "Renewables Denmark",
        style: style,
        source: clusterSource,
    })

    let clusterSource = new ol.source.Cluster({
        source: originalSource
    })
    
    let clusterLayer = new ol.layer.Vector({
        source: clusterSource
    });


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

    debugger;
    console.log(map.getLayers().item(1).getSource().getFeatures()[0]);

    map.on('click', event => {
        console.log(event.coordinate);
    })

})
