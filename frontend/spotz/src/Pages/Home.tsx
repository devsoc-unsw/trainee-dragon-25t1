import { useEffect, useState } from 'react';
import { Marker, MazeMap } from '../Components/MazeMap/components/MazeMap';
import List from '../Components/List/List';
import { getPlacesData } from '../api/travelAdvisory';
export const Home = () => {
  const [listView, setListView] = useState(false);
  const [places, setPlaces] = useState(null);
  const [type, setType] = useState('food');
  const [rating, setRating] = useState('');

  useEffect(() => {
    getPlacesData(type === 'food' ? 'restaurants' : 'restaurants').then(
      (data) => {
        console.log(data);
        setPlaces(data);
      }
    );
  }, []);
  return (
    <>
      <div className="h-screen w-full flex ">
        {listView && (
          <div className="h-full w-1/3">
            <List
              places={places}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
              childClicked={undefined}
              isLoading={undefined}
            />
          </div>
        )}
        <div
          className={`${listView ? 'fixed right-0 w-4/5' : 'w-full'} h-full`}
        >
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
            setListView={setListView}
          />
        </div>
      </div>
    </>
  );
};
