import { Marker, MazeMap } from '../Components/MazeMap/components/MazeMap';

export const Home = () => {
  return (
    <>
      <MazeMap
        campuses={111}
        center={{ lng: 151.231198, lat: -33.917335 }}
        zoom={12}
        width={'100%'}
        controls={true}
        height={'100%'}
        zLevel={1}
        hideWatermark={false}
        marker={{
          type: Marker.POIMarker,
          colour: '#384D63',
          innerColour: '#fff',
          size: 40,
        }}
        maxBounds={[
          [151.224093555, -33.9210064802],
          { lng: 151.237924424, lat: -33.9138716815 },
        ]}
        highlighter={{
          fill: true,
          outline: true,
        }}
        zLevelUpdater={true}
        zLevelControl={false}
      />
    </>
  );
};
