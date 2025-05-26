import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import type { Map } from 'mapbox-gl';
import { Feature, Point } from 'geojson';
import { ListView, MazeMapProps } from '../constants/types';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { TopBarButton } from './TopBarButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SchoolIcon from '@mui/icons-material/School';
import { useState } from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { RegisterAcc } from './CreateAccountButton';
import Cookies from 'js-cookie';
import { setSpotsVisibility } from '../lib/utils';
import { cardData } from '../../RandomSpots/CardData';
import { getLikedSpots } from '../../../Fetchers/likedSpotsFetch';

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
  const mySearch = useMemo(
    () =>
      new window.Mazemap.Search.SearchController({
        campusid: mazeProps.campuses,
        campuscollectiontag: 'unsw',
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

  const [register, setShowRegister] = useState(false);
  return (
    <>
      <div className="absolute flex flex-row top-0.5 mt-1 z-[999] w-1/2 cursor-pointer gap-8 sm:text-lg text-sm">
        <TopBarButton
          label={'Food'}
          classNames={''}
          onClick={() => {
            localStorage.setItem('defaultSpots', JSON.stringify(mySearch));
            localStorage.setItem('curSourceSpotsName', 'geojsonresults');
            setSpotsVisibility(mapRef, 'geojsonresults', () =>
              doSearch(mapRef, mySearch, 'food')
            );
            setListView((prev) => {
              const newPrev = { ...prev };
              if (
                !prev.isViewing ||
                !['direction', 'studyspot', 'likedspot'].includes(prev.type)
              ) {
                newPrev.isViewing = !prev.isViewing;
              }
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
          onClick={async () => {
            Cookies.get('sessionId') ? undefined : setShowRegister(true);
            if (!mapRef.current) return;
            if (mapRef.current) {
              constructLayer(
                mapRef.current,
                'geojsonresults3',
                '#f542aa',
                '#ffffff',
                3
              );
            }
            const spotGeoJsonData = await getLikedSpots();
            localStorage.setItem('curSourceSpotsName', 'geojsonresults3');
            setSpotsVisibility(mapRef, 'geojsonresults3', () =>
              displayMapResults(mapRef, 'geojsonresults3', spotGeoJsonData)
            );

            setListView((prev) => {
              const newPrev = { ...prev };
              if (
                !prev.isViewing ||
                !['direction', 'food', 'studyspot'].includes(prev.type)
              ) {
                newPrev.isViewing = !prev.isViewing;
              }
              newPrev.type = 'likedspot';

              return newPrev;
            });
          }}
        >
          <ThumbUpIcon />
        </TopBarButton>
        <TopBarButton
          label={'Study Spots'}
          classNames={''}
          onClick={() => {
            const spotGeoJsonData = constructLayerData();
            localStorage.setItem('curSourceSpotsName', 'geojsonresults2');

            setSpotsVisibility(mapRef, 'geojsonresults2', () =>
              displayMapResults(mapRef, 'geojsonresults2', spotGeoJsonData)
            );

            setListView((prev) => {
              const newPrev = { ...prev };
              if (
                !prev.isViewing ||
                !['direction', 'food', 'likedspot'].includes(prev.type)
              ) {
                newPrev.isViewing = !prev.isViewing;
              }
              newPrev.type = 'studyspot';

              return newPrev;
            });
          }}
        >
          <SchoolIcon />
        </TopBarButton>
        {Cookies.get('sessionId') ? null : (
          <TopBarButton
            label={'Register'}
            classNames={''}
            onClick={() => setShowRegister(true)}
          >
            <AppRegistrationIcon />
          </TopBarButton>
        )}
      </div>

      {register && <RegisterAcc onClose={() => setShowRegister(false)} />}
    </>
  );
};

export function doSearch(mapRef: any, mySearch: any, query: any) {
  // Perform a search query using the Search object
  mySearch.search(query).then((response: any) => {
    displayMapResults(mapRef, 'geojsonresults', response.results);
  });
}

function displayMapResults(mapRef: any, geojsonName: any, geojsonResults: any) {
  if (mapRef.current.style) {
    mapRef.current.getSource(geojsonName).setData(geojsonResults);
    var bbox = window.Mazemap.Util.Turf.bbox(geojsonResults);
    mapRef.current.fitBounds(bbox, { padding: 100 });
  }
}

function initMapResultsLayer(map: Map) {
  // Add a source layer to use with the layer for rendering geojson features
  constructLayer(map, 'geojsonresults', '#fd7526', '#ffffff', 1);
  constructLayer(map, 'geojsonresults2', '#16badb', '#ffffff', 2);
  initPopupEffect(map, 1);
}

function initPopupEffect(map: Map, id: number) {
  // Create a popup, but don't add it to the map yet.
  var popup = new window.Mazemap.mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // This is one way to achieve 'mouseover' effect on certain layers
  map.on('mousemove', async (e: any) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [`outer-circle${id}`, `inner-circle${id}`],
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

export const constructLayer = (
  map: Map,
  layerName: string,
  colorOuter: string,
  colorInner: string,
  id: number
) => {
  if (map.style) {
    map.addSource(layerName, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
  }

  // Outer circle layer
  map.addLayer(
    {
      id: `outer-circle${id}`,
      type: 'circle',
      source: layerName,
      paint: {
        'circle-color': colorOuter,
        'circle-radius': 10,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      },
    },
    'mm-building-label'
  );

  // Inner circle layer (smaller, drawn on top)
  map.addLayer(
    {
      id: `inner-circle${id}`,
      type: 'circle',
      source: layerName,
      paint: {
        'circle-color': colorInner, // Inner color
        'circle-radius': 4,
      },
    },
    'mm-building-label'
  );
};

export const constructLayerData = () => {
  const geojsonData = {
    type: 'FeatureCollection',
    features: cardData.map((loc) => ({
      type: 'Feature',
      properties: {
        id: loc.id,
        title: loc.roomName,
        zValue: loc.zLevel,
        // dispBldNames: loc.bldName: 'example111',
        campusId: 111,
      },
      geometry: {
        type: 'Point',
        coordinates: [loc.lngLat.lng, loc.lngLat.lat],
      },
    })),
  };

  return geojsonData;
};
