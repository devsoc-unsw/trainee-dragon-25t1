import { CoordinatesObject } from './constants/types';

export const addLine = (
  mapRef: any,
  colour: string,
  width: number,
  coordinates: [CoordinatesObject, CoordinatesObject]
) => {
  if (window.Mazemap) {
    mapRef.current.addLayer({
      id: 'line1',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [coordinates[0].lng, coordinates[0].lat],
              [coordinates[1].lng, coordinates[1].lat],
            ],
          },
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': colour,
        'line-width': width,
      },
    });
  }
};
