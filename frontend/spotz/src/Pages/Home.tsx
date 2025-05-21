import { useEffect, useState } from 'react';
import List from '../Components/List';
import { Marker, MazeMap } from '../Components/MazeMap/components/MazeMap';
import { getPlacesData } from '../api/travelAdvisory';
import { Place } from '../Components/PlaceDetails/types';

export const Home = () => {
  const [listView, setListView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    setIsLoading(true);
    // TODO: uncomment when deploying
    // getPlacesData().then((data) => {
    //   setPlaces(data);
    // });

    const placesTest: Place = {
      address: '123 unsw gang gang',
      awards: [],
      cuisine: [],
      name: 'DevSoc DRAGON',
      num_reviews: 0,
      phone: '',
      photo: false,
      price_level: '',
      ranking: '',
      rating: 0,
      website: 'https://www.google.com/',
      web_url: 'https://www.google.com/',
    };
    places.push(placesTest);
    places.push(placesTest);
    places.push(placesTest);

    const newPlaces = [...places];
    setPlaces(newPlaces);

    setIsLoading(false);
  }, []);
  return (
    <>
      <div className="h-screen w-full flex">
        {listView && (
          <div className="h-full w-1/4">
            <List places={places} isLoading={isLoading} />
          </div>
        )}
        <div
          className={`${listView ? 'fixed right-0 w-3/4' : 'w-full'} h-full `}
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
