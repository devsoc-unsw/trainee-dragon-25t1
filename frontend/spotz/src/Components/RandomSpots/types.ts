export type CoordinateObject = { lng: number; lat: number };

export interface GeoData {
  lngLat: CoordinateObject;
  zLevel: number;
}

export interface SpotData {
  id: number;
  url: any;
  roomName: string;
  info: string[];
  lngLat: CoordinateObject;
  zLevel: number;
}
