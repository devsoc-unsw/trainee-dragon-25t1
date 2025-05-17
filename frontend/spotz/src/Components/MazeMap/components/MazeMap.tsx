import { useEffect, useRef, useState } from 'react';
import '../../../index.css';
import {
  CoordinatesPair,
  MarkerType,
  MazeMapOptions,
  MazeMapProps,
  MazeMapUserOptions,
} from '../constants/types';
import { getCoordinates } from '../lib/utils';
import { prepareMap } from '../lib/map';
import { NavBar } from './NavBar';
import { ThreeDButton } from './ThreeDButton';
import { RandomSpotButton } from './RandomSpotButton';
import { DefaultSearchBar } from './DefaultSearchBar';
import { SearchBar } from './SearchBar';

const MazeMap = (props: MazeMapProps) => {
  const [mapReady, setMapReady] = useState(false);
  const markerRef = useRef<any>(null);
  const highlighterRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  let userOptions: MazeMapUserOptions = {
    campuses: props.campuses,
    ...(props.center && { center: getCoordinates(props.center) }),
    ...(props.zoom && { zoom: props.zoom }),
    ...(props.maxBounds && {
      maxBounds: props.maxBounds.map(getCoordinates) as CoordinatesPair,
    }),
    ...(props.zLevel ? { zLevel: props.zLevel } : { zLevel: 1 }),
    ...(props.zLevelUpdater && { zLevelUpdater: props.zLevelUpdater }),
    ...(props.zLevelControl
      ? { zLevelControl: true }
      : { zLevelControl: false }),
  };

  if (props.threeD) {
    userOptions = {
      ...userOptions,
      pitch: props.pitch,
      bearing: props.bearing,
      threeD: props.threeD,
    };
  }

  const mapOptions: MazeMapOptions = {
    container: 'map',
    ...userOptions,
  };

  useEffect(() => {
    if (!props.zoomTo) return;
    const center = getCoordinates(props.zoomTo.center);
    const zoomAmount = props.zoomTo.zoom;
    if (!props.speed) {
      mapRef.current.jumpTo({
        center,
        zoomAmount,
      });
    } else {
      const speed = props.zoomTo.speed;
      mapRef.current.flyTo({
        center,
        zoomAmount,
        speed,
      });
    }
  }, [props.zoomTo]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.mazemap.com/js/v2.2.1/mazemap.min.js';
    document.body.appendChild(script);

    const mapDOM = document.getElementById('map');
    if (mapDOM) {
      mapDOM.classList.add('mazemap');
    }

    script.onload = () => {
      prepareMap(mapRef, mapOptions, props, markerRef, highlighterRef);
      setMapReady(true);
    };
    script.onerror = (e) => {
      console.error('mazemap-react: mazemap script failed to load');
      console.error(e);
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://api.mazemap.com/js/v2.2.1/mazemap.min.css"
      />
      <div
        id="map"
        aria-label="map view"
        tabIndex={1}
        style={{ width: props.width, height: props.height }}
      ></div>
      {mapReady ? (
        <>
          <RandomSpotButton />
          <NavBar mapRef={mapRef}/>
          <DefaultSearchBar mapRef={mapRef} mazeProps={props} />
          <SearchBar
            mapRef={mapRef}
            mazeProps={props}
            markerRef={markerRef}
            highlighterRef={highlighterRef}
          />
        </>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center text-7xl">
          Loading...
        </div>
      )}
      {props.hideWatermark && (
        <style>
          {`
        div.mazemap-ctrl-logo-wrapper .mazemap-ctrl-logo,
        a.mapboxgl-ctrl-logo,
        .mapboxgl-ctrl-attrib.mapboxgl-compact .mapboxgl-ctrl-attrib-button,
        .mapboxgl-ctrl-attrib.mapboxgl-compact-show .mapboxgl-ctrl-attrib-inner,
        .mapboxgl-ctrl.mapboxgl-ctrl-attrib.mm-attribution-control-override {
          display: none;
        }
        `}
        </style>
      )}
    </>
  );
};

export { MazeMap, MarkerType as Marker };
