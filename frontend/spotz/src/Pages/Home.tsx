import { useEffect, useRef, useState } from 'react';
import SpotList from '../Components/SpotList';
import { Marker, MazeMap } from '../Components/MazeMap/components/MazeMap';
// import { getPlacesData } from '../api/travelAdvisory';
import { Place } from '../Components/PlaceDetails/types';
import { ListView } from '../Components/MazeMap/constants/types';
import { RouteList } from '../Components/Route/RouteList';
// import { foodSpots } from '../api/data';
import { motion, AnimatePresence } from 'framer-motion';
import { cardData } from '../Components/RandomSpots/CardData';

export const Home = () => {
  const [listView, setListView] = useState<ListView>({
    isViewing: false,
    type: 'food',
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [places, setPlaces] = useState<Place[]>(foodSpots as any);
  const [places, setPlaces] = useState<Place[]>([]);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // TODO stored the data from the api in data.ts
    // probably bad cuz its a huge chunk of data
    setIsLoading(true);
    // TODO: uncomment when deploying
    // getPlacesData().then((data) => {
    //   setPlaces(data);
    // });
    if (listView.type === 'food') {
      const newPlaces: Place[] = [
        {
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
        },
      ];

      newPlaces.push({ ...newPlaces[0] });
      newPlaces.push({ ...newPlaces[0] });
      newPlaces.push({ ...newPlaces[0] });

      setPlaces(newPlaces);
    } else if (listView.type === 'studyspot') {
      const places: Place[] = cardData.map((loc) => {
        return {
          name: loc.roomName,
          photo: {
            images: {
              large: {
                width: '550',
                height: '700',
                url: loc.url
                  ? loc.url
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
              },
            },
          },
          num_reviews: 0,
          rating: Math.floor(Math.random() * 6),
        };
      });
      setPlaces(places);
    }

    setIsLoading(false);
  }, [listView.type]);

  const listVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="h-screen w-full flex">
        <AnimatePresence>
          {listView.isViewing && (
            <motion.div
              className="relative h-full w-1/4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={listVariants}
            >
              {['food', 'studyspot', 'likedStudySpot'].includes(
                listView.type
              ) ? (
                <SpotList
                  mapRef={mapRef}
                  places={places}
                  isLoading={isLoading}
                  setListView={setListView}
                  type={listView.type}
                />
              ) : (
                <RouteList
                  mapRef={mapRef}
                  listView={listView}
                  setListView={setListView}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={`${
            listView.isViewing ? 'fixed right-0 w-3/4' : 'w-full'
          } h-full `}
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
            mapRef={mapRef}
          />
        </div>
      </div>
    </>
  );
};
