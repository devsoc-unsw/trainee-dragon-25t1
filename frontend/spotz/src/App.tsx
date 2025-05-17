import './App.css';
import { Marker } from '@lachlanshoesmith/mazemap-react';
import { MazeMap } from './MazeMap/MazeMap';

function App() {
  return (
    <>
      <MazeMap
        campuses={111}
        center={{ lng: 151.231198, lat: -33.917335 }}
        // center={[123, -123]} // this also works - take your pick!
        zoom={12}
        width={'100%'}
        controls={true}
        height={'100%'}
        zLevel={1}
        hideWatermark={false}
        marker={{
          // marker that locks on to and highlights POI if one is clicked on
          // Marker.Marker does not do this and just draws a marker exactly
          // where the user clicked
          type: Marker.POIMarker,
          colour: '#384D63',
          innerColour: '#fff',
          size: 40,
        }}
        // coordinates passed to onMapClick will be in the tuple [] format
        // onMapClick={(coordinates, zLevel) => ...}
        maxBounds={
          // again, you can use either syntax:
          [
            [151.224093555, -33.9210064802],
            { lng: 151.237924424, lat: -33.9138716815 },
          ]
        }
        highlighter={{
          fill: true,
          outline: true,
          // colour: '#ff0000', // optional
          // outlineColour: '#00ffff', // optional
          // poiOnLoad: {
          //   // highlight a POI at the given coordinates
          //   // when the map is mounted
          //   // as usual, you can enter the coordinates in either
          //   // the {lng: lat: } format or as a tuple
          //   coordinates: [151.231398, -33.918749],
          //   zLevel: 3,
          // },
        }}
        // pitch={56.8}
        // bearing={-28.8}
        // threeD={true}

        zLevelUpdater={true}
        zLevelControl={false}
      />
    </>
  );
}

export default App;
