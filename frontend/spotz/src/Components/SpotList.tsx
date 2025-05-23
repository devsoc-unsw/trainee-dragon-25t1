import { CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { PlaceDetails } from './PlaceDetails/PlaceDetails';
import { Place } from './PlaceDetails/types';
import React, { Dispatch, SetStateAction } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { ListView } from './MazeMap/constants/types';

interface SpotListProps {
  places: Place[];
  isLoading: any;
  setListView: Dispatch<SetStateAction<ListView>>;
}

const SpotList: React.FC<SpotListProps> = ({
  places,
  isLoading,
  setListView,
}) => {
  const handleCollapseList = () => {
    setListView((prev: ListView) => {
      const newPrev = { ...prev };
      newPrev.isViewing = !prev.isViewing;
      return newPrev;
    });
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
