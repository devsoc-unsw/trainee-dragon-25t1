import { CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { PlaceDetails } from './PlaceDetails/PlaceDetails';
import { Place } from './PlaceDetails/types';
import React, { Dispatch, SetStateAction } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { ListView } from './MazeMap/constants/types';
import { setSpotsVisibility } from './MazeMap/lib/utils';
import type { Map } from 'mapbox-gl';

interface SpotListProps {
  mapRef: React.RefObject<Map | null>;
  places: Place[];
  isLoading: any;
  setListView: Dispatch<SetStateAction<ListView>>;
}

const SpotList: React.FC<SpotListProps> = ({
  mapRef,
  places,
  isLoading,
  setListView,
}) => {
  const handleCollapseList = () => {
    const mySearch = JSON.parse(localStorage.getItem('defaultSpots') as string);
    setSpotsVisibility(mapRef, mySearch);
    setListView((prev: ListView) => {
      const newPrev = { ...prev };
      newPrev.isViewing = !prev.isViewing;
      return newPrev;
    });
    localStorage.removeItem('defaultSpots');
  };
  return (
    <div className="p-6">
      <button onClick={handleCollapseList}>
        <MenuRoundedIcon
          className="absolute top-4 left-4"
          sx={{ height: '3rem', width: '3rem' }}
        />
      </button>
      <Typography
        variant="h2"
        sx={{ marginBottom: '1rem', fontWeight: '400', textAlign: 'center' }}
      >
        Food
      </Typography>
      <hr className="h-8" />
      {isLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid container spacing={3} className="h-[80vh] overflow-auto">
            {places?.map((place: any, i: number) => (
              <Grid key={i} size={{ xs: 14 }}>
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default SpotList;
