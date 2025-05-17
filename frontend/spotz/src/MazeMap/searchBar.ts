import { addMarker } from './marker';
import { MapClick, MazeMapProps } from './constants/types';

export const searchBar = (
  mapRef: any,
  props: MazeMapProps,
  markerRef: any,
  highlighterRef: any
) => {
  const outerDiv = document.createElement('div');
  outerDiv.id = 'search-input-container';
  outerDiv.classList.add('search-control-default');

  const input = document.createElement('input');
  input.tabIndex = 0;
  input.id = 'searchInput';
  input.classList.add('search-input');
  input.autocomplete = 'off';
  input.type = 'text';
  input.name = 'search';
  input.placeholder = 'Search';

  outerDiv.appendChild(input);

  const suggestions = document.createElement('div');
  suggestions.id = 'suggestions';
  suggestions.classList.add('search-suggestions', 'default');

  outerDiv.appendChild(suggestions);
  document.body.appendChild(outerDiv);

  const mySearch = new window.Mazemap.Search.SearchController({
    campusid: props.campuses,
    rows: 10,
    withpois: true,
    withbuilding: false,
    withtype: false,
    withcampus: false,
    resultsFormat: 'geojson',
  });

  let mySearchInput: any;
  mySearchInput = new window.Mazemap.Search.SearchInput({
    container: document.getElementById('search-input-container'),
    input: document.getElementById('searchInput'),
    suggestions: document.getElementById('suggestions'),
    searchController: mySearch,
  });

  mySearchInput.on('itemclick', async (e: any) => {
    const [lng, lat] = e.item.geometry.coordinates;
    const coords = { lng, lat };
    mapRef.current.zLevel = e.item.properties.zValue;
    console.log('e: ', e);

    let temp: MapClick = {
      _defaultPrevented: false,
      point: { x: 1, y: 2 },
      lngLat: coords,
      originalEvent: e,
      target: undefined,
      type: '',
    };

    temp.lngLat = coords;

    markerRef.current = await addMarker(
      mapRef,
      props,
      temp,
      markerRef,
      highlighterRef
    );
  });
  mapRef.current.getCanvas().addEventListener('focus', () => {
    if (mySearchInput) {
      mySearchInput.hideSuggestions();
    }
  });
};

export const defaultSearchBar = (mapRef: any, props: MazeMapProps) => {
  const mySearch = new window.Mazemap.Search.SearchController({
    campusid: props.campuses,
    rows: 100,
    withpois: true,
    withbuilding: false,
    withtype: false,
    withcampus: false,
    resultsFormat: 'geojson',
  });

  const outerDiv = document.createElement('div');
  outerDiv.id = 'controls';
  outerDiv.classList.add('mapboxgl-ctrl-group');

  const button1 = document.createElement('button');
  button1.textContent = 'Food';
  button1.onclick = () => {
    doSearch(mapRef, mySearch, 'food');
  };

  // const button2 = document.createElement('button');
  // button2.onclick = (mapRef) => {
  //   doSearch(mapRef, mySearch, 'study');
  // };

  outerDiv.appendChild(button1);
  // outerDiv.appendChild(button2);
  document.body.appendChild(outerDiv);

  initMapResultsLayer(mapRef);
  initPopupEffect(mapRef);
};

function doSearch(mapRef: any, mySearch: any, query: any) {
  // Clear the results output
  // printSearchData(null);
  // document.getElementById('searchQuery').innerHTML = query;

  // Perform a search query using the Search object
  mySearch.search(query).then((response: any) => {
    // printSearchData(response.results);
    displayMapResults(mapRef, response.results);
  });
}

function displayMapResults(mapRef: any, geojsonResults: any) {
  mapRef.current.getSource('geojsonresults').setData(geojsonResults);
  var bbox = window.Mazemap.Util.Turf.bbox(geojsonResults);
  mapRef.current.fitBounds(bbox, { padding: 100 });
}

function initMapResultsLayer(mapRef: any) {
  // Add a source layer to use with the layer for rendering geojson features
  mapRef.current.addSource('geojsonresults', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  });

  mapRef.current.addLayer(
    {
      id: 'geojsonresults',
      type: 'circle',
      source: 'geojsonresults',
      paint: {
        'circle-color': '#fd7526',
        'circle-radius': 7,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
      },
    },
    'mm-building-label'
  ); // Add this layer UNDER the building label layers
}

function initPopupEffect(mapRef: any) {
  // Create a popup, but don't add it to the map yet.
  var popup = new window.Mazemap.mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // This is one way to achieve 'mouseover' effect on certain layers
  mapRef.current.on('mousemove', function (e: any) {
    var features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ['geojsonresults'],
    });
    if (!features || features.length < 1) {
      popup.remove();
      localStorage.removeItem('defaultSearchBarZlevel');
      return;
    } else {
      // Populate the popup and set its coordinates
      // based on the feature found.
      const zValue = localStorage.getItem('defaultSearchBarZlevel');
      if (zValue && zValue != features[0].properties.zValue) {
        localStorage.setItem(
          'defaultSearchBarZlevel',
          features[0].properties.zValue
        );
      } else if (zValue != features[0].properties.zValue) {
        localStorage.setItem(
          'defaultSearchBarZlevel',
          features[0].properties.zValue
        );
      }

      const buildName = JSON.parse(features[0].properties.dispBldNames);
      popup
        .setLngLat(features[0].geometry.coordinates)
        .setHTML(
          `<h2 class="popup-design">${buildName}</h2>
          <div class="popup-design">${features[0].properties.title}</div>`
        )
        .addTo(mapRef.current);
    }
    // console.log(features);
  });
}
