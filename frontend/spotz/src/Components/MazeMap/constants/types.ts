import { Dispatch, SetStateAction } from 'react';

declare global {
  interface Window {
    Mazemap: any;
  }
}

// MazeMap Inputs
export interface MazeMapUserOptions {
  campuses: number;
  center?: CoordinatesObject | Coordinates;
  zoom?: number;
  maxBounds?: CoordinatesPair;

  // Zlevel
  zLevel?: number;
  zLevelUpdater?: boolean;
  zLevelControl?: boolean;

  // 3D props
  pitch?: number;
  bearing?: number;
  threeD?: boolean;
  //TODO: Figure out how to get 3D assets to work and give users two option for the 3D display
  // threeD: boolean | {animateWalls: boolean, show3dAssets: boolean,}
}

export interface MazeMapProps extends MazeMapUserOptions {
  [key: string]: any;
  width: string;
  height: string;
  controls?: boolean;
  hideWatermark?: boolean;
  marker?: MarkerProp;
  onMapClick?: (coordinates: Coordinates, zLevel: number) => void;
  line?: LineProp;
  highlighter?: HighlighterProp;

  // Zoom props
  zoomTo?: ZoomToProp;
  scrollZoom?: boolean;
  doubleClickZoom?: boolean;
  touchZoomRotate?: boolean;

  setListView: Dispatch<SetStateAction<boolean>>;
}

export interface MazeMapOptions extends MazeMapUserOptions {
  container: string;
}

// Coordinates
export type Coordinates = [number, number];

export interface CoordinatesObject {
  lng: number;
  lat: number;
}

export type CoordinatesPair = [
  Coordinates | CoordinatesObject,
  Coordinates | CoordinatesObject
];

// Marker
export enum MarkerType {
  Marker = 1,
  POIMarker = 2,
}

export interface MarkerProp {
  [key: string]: any;
  type: MarkerType;
  colour?: string;
  innerColour?: string;
  size?: number;
}

// Line
export interface LineProp {
  colour?: string;
  width?: number;
  coordinates: CoordinatesPair;
}

// POI
export interface POI {
  // GeoJSON format
  type: string;
  geometry: Geometry;
  properties: any;
}

export interface PoiLocation {
  coordinates: Coordinates | CoordinatesObject;
  zLevel: number;
}

export interface Geometry {
  type: string;
  coordinates: Array<any>;
}

export interface HighlighterProp {
  fill: boolean;
  outline: boolean;
  colour?: string;
  outlineColour?: string;
  poiOnLoad?: PoiLocation;
}

export interface XY {
  x: number;
  y: number;
}

// MazeMap map's values
export interface MapClick {
  _defaultPrevented: boolean;
  point: XY;
  lngLat: CoordinatesObject;
  originalEvent: MouseEvent;
  target: any; // very complicated definition
  type: string;
}

// Zoom
export interface ZoomToProp {
  center: Coordinates | CoordinatesObject;
  zoom: number;
  speed?: number;
}
