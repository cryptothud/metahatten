import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
const mapFeatures = require("../functions/mapFeatures.json");
import * as turf from '@turf/turf'

export default function Map() {

  const [popup, setPopup] = useState()

  const [search, setSearch] = useState()

  const [selectedProperty, setSelectedProperty] = useState()

    useEffect(() => {
        mapboxgl.accessToken =
          "pk.eyJ1IjoiY3J5cHRvdGh1ZCIsImEiOiJjbDhqb3QyZzYwOTE0M29xbWx6azZ1NmJyIn0.HQmHfJG5dFSszo4z0KKC3A";
        const map = new mapboxgl.Map({
          // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          style: "mapbox://styles/mapbox/light-v10",
          center: [-74.0136, 40.6995],
          zoom: 15.7,
          pitch: 65,
          bearing: 30.6,
          container: "mapBox",
          antialias: true
        });
    
        map.on("load", () => {
          // Insert the layer beneath any symbol layer.
          const layers = map.getStyle().layers;
          const labelLayerId = layers.find(
            (layer) => layer.type === "symbol" && layer.layout["text-field"]
          ).id;
          map.setFog({
            'horizon-blend': 0.3,
            'color': '#e3e5f8',
            'high-color': '#add8e6',
            'space-color': '#d8f2ff',
            'star-intensity': 0.0
            });
          map.addSource("places", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: mapFeatures
            }
          });
    
        //   When a click event occurs on a feature in the places layer, open a popup at the
        //   location of the feature, with description HTML from its properties.
        //   map.on("click", "places", (e) => {
        //     // Copy coordinates array.
        //     const coordinates = e.features[0].geometry.coordinates.slice();
        //     const description = e.features[0].properties.description;
    
        //     // Ensure that if the map is zoomed out such that multiple
        //     // copies of the feature are visible, the popup appears
        //     // over the copy being pointed to.
        //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //     }
    
        //     new mapboxgl.Popup()
        //       .setLngLat(coordinates)
        //       .setHTML(description)
        //       .addTo(map);
        //   });
          // The 'building' layer in the Mapbox Streets
          // vector tileset contains building height data
          // from OpenStreetMap.

          map.addLayer(
            {
              id: "3d-buildings",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 15,
              paint: {
                "fill-extrusion-color": "#aaa",
    
                // Use an 'interpolate' expression to
                // add a smooth transition effect to
                // the buildings as the user zooms in.
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "height"]
                ],
                "fill-extrusion-base": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "min_height"]
                ],
                "fill-extrusion-opacity": 0.6
              }
            },
            labelLayerId
          );

          map.addSource('currentBuildings', {
            type: 'geojson',
            data: {
              "type": "FeatureCollection",
              "features": []
            }
          });

          map.addLayer({
            id: "highlight",
            source: "currentBuildings",
            type: 'line',
            minzoom: 15,
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "blue",
  
              // Use an 'interpolate' expression to
              // add a smooth transition effect to
              // the buildings as the user zooms in.
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"]
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"]
              ],
              "fill-extrusion-opacity": 1
            }
          }, labelLayerId);
          
          // Change the cursor to a pointer when the mouse is over the places layer.
          map.on("mouseenter", "3d-buildings", () => {
            map.getCanvas().style.cursor = "pointer";
          });
    
          // Change it back to a pointer when it leaves.
          map.on("mouseleave", "3d-buildings", () => {
            map.getCanvas().style.cursor = "";
          });

        //   map.on("click", "places", (e) => {
        //     console.log('here')
        //     // Copy coordinates array.
        //     const coordinates = e.features[0].geometry.coordinates.slice();
        //     const description = e.features[0].properties.description;
    
        //     // Ensure that if the map is zoomed out such that multiple
        //     // copies of the feature are visible, the popup appears
        //     // over the copy being pointed to.
        //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //     }
    
        //     new mapboxgl.Popup()
        //       .setLngLat(coordinates)
        //       .setHTML(description)
        //       .addTo(map);
        //   });
          map.on('click', function(e) {
            console.log(e)
            map.getSource('currentBuildings').setData({
              "type": "FeatureCollection",
              "features": []
            });
            setPopup()
          });

          map.on('click', '3d-buildings', function(e) {
            var poly = turf.polygon(e.features[0].geometry.coordinates);
            mapFeatures.some((o) => {
              var pt = turf.point(o.geometry.coordinates);
              if (turf.booleanPointInPolygon(pt, poly)) {
                setPopup(o)
              }
            })
            map.getSource('currentBuildings').setData({
              "type": "FeatureCollection",
              "features": e.features
            });
          })
        })
      }, [selectedProperty]);



    return (
        <div className="mapBoxContainer">
            <input type="text" value={search} placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            {search ?
              <div onClick={() => {setSelectedProperty(mapFeatures[244])}}>{search}</div>
            : null}
            {popup ?
              <div className="popup">
                <h1>Coords: {popup.geometry.coordinates}</h1>
                <h1>Coords: {popup.geometry.coordinates}</h1>
              </div>
              : null
            }
            <link
                href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
                rel="stylesheet"
            />
            <div id="mapBox" />
        </div>
    )
}