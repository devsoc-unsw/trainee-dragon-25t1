import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import type { Map } from 'mapbox-gl';
import { Feature, Point } from 'geojson';
import { ListView, MazeMapProps } from '../constants/types';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { TopBarButton } from './TopBarButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SchoolIcon from '@mui/icons-material/School';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

interface DefaultSearchBarProps {
  mapRef: React.RefObject<Map | null>;
  mazeProps: MazeMapProps;
  setListView: Dispatch<SetStateAction<ListView>>;
}

export const TopBar: React.FC<DefaultSearchBarProps> = ({
  mapRef,
  mazeProps,
  setListView,
}) => {
  const navigate = useNavigate();

  const mySearch = useMemo(
    () =>
      new window.Mazemap.Search.SearchController({
        campusid: mazeProps.campuses,
        rows: 100,
        withpois: true,
        withbuilding: false,
        withtype: false,
        withcampus: false,
        resultsFormat: 'geojson',
      }),
    [mazeProps.campuses]
  );
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (map.isStyleLoaded()) {
      initMapResultsLayer(map);
    } else {
      map.once('load', () => initMapResultsLayer(map)); // wait until first style load
    }
  }, []);

  return (
    <>
      <div className="absolute flex flex-row top-0.5 mt-1 z-[999] w-1/2 cursor-pointer gap-8 sm:text-lg text-sm">
        <TopBarButton
          label={'Food'}
          classNames={''}
          onClick={() => {
            doSearch(mapRef, mySearch, 'food');
            setListView((prev) => {
              const newPrev = { ...prev };
              newPrev.isViewing = !prev.isViewing;
              newPrev.type = 'food';
              return newPrev;
            });
          }}
        >
          <RestaurantIcon sx={{ marginBottom: '2px' }} />
        </TopBarButton>
        <TopBarButton
          label={'My Liked Spots'}
          classNames={''}
          onClick={undefined}
        >
          <ThumbUpIcon />
        </TopBarButton>
        <TopBarButton label={'Study Spots'} classNames={''} onClick={undefined}>
          <SchoolIcon />
        </TopBarButton>
        <TopBarButton
          label={'Register'}
          classNames={''}
          onClick={() => navigate('/register')}
        >
          <AppRegistrationIcon />
        </TopBarButton>
      </div>
    </>
  );
};

function doSearch(mapRef: any, mySearch: any, query: any) {
  // Perform a search query using the Search object
  mySearch.search(query).then((response: any) => {
    displayMapResults(mapRef, response.results);
  });
}

function displayMapResults(mapRef: any, geojsonResults: any) {
  if (mapRef.current.style) {
    mapRef.current.getSource('geojsonresults').setData(geojsonResults);
    var bbox = window.Mazemap.Util.Turf.bbox(geojsonResults);
    mapRef.current.fitBounds(bbox, { padding: 100 });
  }
}

function initMapResultsLayer(map: Map) {
  // Add a source layer to use with the layer for rendering geojson features
  if (map.style) {
    map.addSource('geojsonresults', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
  }
  map.addLayer(
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
  initPopupEffect(map);
}

function initPopupEffect(map: Map) {
  // Create a popup, but don't add it to the map yet.
  var popup = new window.Mazemap.mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // This is one way to achieve 'mouseover' effect on certain layers
  map.on('mousemove', async (e: any) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['geojsonresults'],
    });
    const feat = features[0] as Feature<Point>;

    if (!features || features.length < 1) {
      popup.remove();
      localStorage.removeItem('defaultSearchBarZlevel');
      return;
    } else {
      // Populate the popup and set its coordinates
      // based on the feature found.
      const zValue = localStorage.getItem('defaultSearchBarZlevel');
      if (zValue && zValue != feat.properties?.zValue) {
        localStorage.setItem('defaultSearchBarZlevel', feat.properties?.zValue);
      } else if (zValue != feat.properties?.zValue) {
        localStorage.setItem('defaultSearchBarZlevel', feat.properties?.zValue);
      }

      const buildName = JSON.parse(feat.properties?.dispBldNames);
      popup
        .setLngLat(feat.geometry.coordinates)
        .setHTML(
          `<h2 class="popup-design">${buildName}</h2>
          <div class="popup-design">${feat.properties?.title}</div>`
        )
        .addTo(map);
    }
  });
}
