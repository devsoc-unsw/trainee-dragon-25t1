import type { Map } from 'mapbox-gl';
import { RouteData } from '../MazeMap/constants/types';

export const generateRoute = (
  mapRef: React.RefObject<Map | null>,
  routeControllerRef: React.RefObject<RouteData | null>,
  start: RouteData,
  dest: RouteData
) => {
  const map = mapRef.current;
  if (!map) return;
  let routeController = routeControllerRef.current;

  routeController = new window.Mazemap.RouteController(map, {
    routeLineColorPrimary: '#0099EA',
    routeLineColorSecondary: '#888888',
    showDirectionArrows: true, // Turn off if you don't want direction arrows
  });
  window.Mazemap.Data.getRouteJSON(start, dest).then((geojson: any) => {
    routeController?.setPath(geojson);
    // console.log('@ geojson', geojson);
    // Fit the map bounds to the path bounding box
    var bounds = window.Mazemap.Util.Turf.bbox(geojson);
    map.fitBounds(bounds, { padding: 300 });
  });

  routeControllerRef.current = routeController;
};
