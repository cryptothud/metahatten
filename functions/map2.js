import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
const mapFeatures = require("./mapFeatures.json");
import * as turf from '@turf/turf'
import Map, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map2() {

  const [popup, setPopup] = useState()

  const [search, setSearch] = useState()

  const [selectedProperty, setSelectedProperty] = useState()

  const layer1 = {
    'id': 'add-3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#aaa',
     
    // Use an 'interpolate' expression to
    // add a smooth transition effect to
    // the buildings as the user zooms in.
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
    }
  }

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
            <Map
              initialViewState={{
                longitude: -74.0136,
                latitude: 40.7035,
                zoom: 15.7,
                pitch: 65,
                bearing: 30.6,
              }}
              style={{width: '100%', height: '100vh'}}
              mapStyle="mapbox://styles/mapbox/light-v10"
              mapboxAccessToken={"pk.eyJ1IjoiY3J5cHRvdGh1ZCIsImEiOiJjbDhqb3QyZzYwOTE0M29xbWx6azZ1NmJyIn0.HQmHfJG5dFSszo4z0KKC3A"}
            >
              <Source id="3d-buildings" type="geojson" data={mapFeatures}>
                <Layer {...layer1} />
              </Source>
            </Map>
        </div>
    )
}