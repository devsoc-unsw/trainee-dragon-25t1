import {
  CoordinatesObject,
  MapClick,
  MazeMapOptions,
  MazeMapProps,
} from '../constants/types';
import { generateFloorBar } from './floorBar';
import { initialiseHighlighter } from './highlight';
import { addLine } from './line';
import { addMarker, showPoiOnLoadMarker } from './marker';
import '../styles/mazemap.css';
import { getCoordinates, getProp } from './utils';

export const prepareMap = (
  mapRef: any,
  mapOptions: MazeMapOptions,
  props: MazeMapProps,
  markerRef: any,
  highlighterRef: any
) => {
  if (window.Mazemap) {
    localStorage.removeItem('curLngLat');
    localStorage.removeItem(`searchedPoint2`);
    localStorage.removeItem(`searchedPoint3`);

    mapRef.current = new window.Mazemap.Map(mapOptions);

    mapRef.current.on('load', () => {
      if (!props.zLevelControl) {
        generateFloorBar(mapRef);
      }

      mapRef.current.on('click', (e: MapClick) => {
        if (!props.onMapClick) return;
        props.onMapClick([e.lngLat.lng, e.lngLat.lat], mapRef.current.zLevel);
      });

      if (props.controls) {
        mapRef.current.addControl(
          new window.Mazemap.mapboxgl.NavigationControl()
        );
      }

      if (props.highlighter) {
        highlighterRef.current = initialiseHighlighter(mapRef, props);
        if (props.highlighter.poiOnLoad) {
          showPoiOnLoadMarker(
            mapRef,
            props.highlighterRef.poiOnLoad,
            props,
            markerRef
          );
        }
      }

      if (props.marker) {
        mapRef.current.on('click', async (e: MapClick) => {
          markerRef.current = await addMarker(
            mapRef,
            props,
            e,
            markerRef,
            highlighterRef
          );
        });
      }

      if (props.line) {
        const colour = getProp(props, 'line', 'colour', '#ff00cc');
        const width = getProp(props, 'line', 'width', 3);
        const coordinates = props.line.coordinates.map(getCoordinates);
        addLine(
          mapRef,
          colour,
          width,
          coordinates as [CoordinatesObject, CoordinatesObject]
        );
      }
    });
  }
};
