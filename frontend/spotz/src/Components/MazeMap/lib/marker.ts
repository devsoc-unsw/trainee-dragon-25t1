import { clearHighlighter, highlightPoi } from './highlight';
import {
  CoordinatesObject,
  MapClick,
  MarkerType,
  MazeMapProps,
  PoiLocation,
} from '../constants/types';
import { getCoordinates, getProp } from './utils';

export const clearMarker = (markerRef: any) => {
  if (markerRef.current) {
    markerRef.current.remove();
  }
};

const drawMarker = async (
  mapRef: any,
  props: MazeMapProps,
  coordinates: CoordinatesObject,
  zLevel: number
) => {
  if (window.Mazemap) {
    const colour = getProp(props, 'marker', 'colour', '#384D63');
    const innerColour = getProp(props, 'marker', 'innerColour', '#ffffff');
    const size = getProp(props, 'marker', 'size', 34);

    return await new window.Mazemap.MazeMarker({
      color: colour,
      innerCircle: true,
      innerCircleColor: innerColour,
      size,
      innerCircleScale: 0.5,
      zlevel: zLevel,
    })
      .setLngLat(coordinates)
      .addTo(mapRef.current);
  }
};

export const addMarker = async (
  mapRef: any,
  props: MazeMapProps,
  e: MapClick,
  markerRef: any,
  highlighterRef: any
) => {
  let zLevel = mapRef.current.zLevel;

  clearMarker(markerRef);
  clearHighlighter(highlighterRef);
  if (window.Mazemap) {
    const zValue = localStorage.getItem('defaultSearchBarZlevel');

    if (zValue && zValue != zLevel) {
      zLevel = zValue;
      mapRef.current.zLevel = zValue;
    }
    const poi = await window.Mazemap.Data.getPoiAt(e.lngLat, zLevel);
    if (!poi) {
      const storedPoint = { lnglat: e.lngLat, zLevel };
      localStorage.setItem('curLngLat', JSON.stringify(storedPoint));
      return await drawMarker(mapRef, props, e.lngLat, zLevel);
    }

    const lnglat = window.Mazemap.Util.getPoiLngLat(poi);
    if (
      poi.geometry.type === 'Polygon' &&
      props.marker?.type === MarkerType.POIMarker
    ) {
      await highlightPoi(poi, highlighterRef);
      mapRef.current.flyTo({
        center: lnglat,
        zoom: 20,
        speed: 0.5,
      });
    }

    const storedPoint = { lnglat, zLevel: zLevel };
    localStorage.setItem('curLngLat', JSON.stringify(storedPoint));

    return await drawMarker(
      mapRef,
      props,
      getCoordinates(lnglat),
      poi.properties.zLevel
    );
  }
};

export const showPoiOnLoadMarker = async (
  mapRef: any,
  poiOnLoad: PoiLocation,
  props: MazeMapProps,
  markerRef: any
) => {
  const poiCoordinates: CoordinatesObject = getCoordinates(
    poiOnLoad.coordinates
  );
  const poi = await window.Mazemap.Data.getPoiAt(
    poiCoordinates,
    poiOnLoad.zLevel
  );
  const lnglat = window.Mazemap.Util.getPoiLngLat(poi);
  markerRef.current = await drawMarker(mapRef, props, lnglat, poiOnLoad.zLevel);
  mapRef.current.flyTo({
    center: lnglat,
    zoom: 19,
    speed: 0.5,
  });
};
