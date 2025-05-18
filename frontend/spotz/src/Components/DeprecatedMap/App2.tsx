import './App.css';
// import { Marker } from '@lachlanshoesmith/mazemap-react';
import { useEffect } from 'react';

function App2() {
  let marker: any;
  useEffect(() => {
    if (window.Mazemap) {
      const map = new window.Mazemap.Map({
        // container: 'map',
        // campuses: 113,
        // center: { lng: 151.231198, lat: -33.917335 },
        // zLevel: 3,
        // zoom: 15.5,
        //TODO this works !!!
        container: 'map',
        campuses: 47,
        center: { lng: 151.231198, lat: -33.917335 },
        pitch: 56.8,
        bearing: -28.8,
        zoom: 19.5,
        zLevel: 6,
        // zLevelControl: true,
        scrollZoom: true,
        doubleClickZoom: true,
        // touchZoomRotate: true, //TODO mystery zoom change zLevel
        threeD: {
          animateWalls: true,
          show3dAssets: true,
        },
      });

      const mapDOM = document.getElementById('map');
      if (mapDOM) {
        mapDOM.classList.add('mazemap');
      }

      map.on('load', () => {
        console.log('Map loaded');
        map.on('click', onMapClick);

        // Initialize a Highlighter for POIs
        // Storing the object on the map just makes it easy to access for other things
        map.highlighter = new window.Mazemap.Highlighter(map, {
          showOutline: true, // optional
          showFill: true, // optional
          outlineColor: window.Mazemap.Util.Colors.MazeColors.MazeBlue, // optional
          fillColor: window.Mazemap.Util.Colors.MazeColors.MazeBlue, // optional
        });

        // Trigger a manual 'click' on this lngLat just to highlight something initially
        // onMapClick({
        //   lngLat: { lng: 151.77132658935858, lat: -32.927328449531224 },
        // });
        map.addControl(new window.Mazemap.mapboxgl.NavigationControl());
        map.enable3d();
      });

      async function onMapClick(e: any) {
        // un-highlight any already highlighted rooms
        map.highlighter.clear();
        if (marker) {
          marker.remove();
        }

        var lngLat = e.lngLat;
        var zLevel = map.zLevel;

        // Fetching via Data API
        // NB: Adding optional campusId parameter, makes lookup much faster, but can be omitted
        const poi = await window.Mazemap.Data.getPoiAt(lngLat, zLevel);
        highlightRoom(map, poi);

        marker = new window.Mazemap.MazeMarker({
          zLevel: 3, // The floor zLevel coordinate is given here
        })
          .setLngLat(lngLat) // Set the LngLat coordinates here
          .addTo(map);
      }
    }
  }, []);

  async function highlightRoom(map: any, poi: any) {
    // console.log(poi);
    try {
      var lngLat = await window.Mazemap.Util.getPoiLngLat(poi);
      // If the POI has a polygon, use the default 'highlight' function to draw a marked outline around the POI.
      if (poi.geometry.type === 'Polygon') {
        map.highlighter.highlight(poi);
      }
      map.flyTo({ center: lngLat, speed: 0.5 });
    } catch (_) {
      console.log('Not valid campus coordinates');
    }
  }

  return (
    <>
      <div id="map" style={{ width: '100%', height: '600px' }} />
    </>
  );
}

export default App2;
