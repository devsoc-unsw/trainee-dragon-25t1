import { CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { PlaceDetails } from './PlaceDetails/PlaceDetails';
import { Place } from './PlaceDetails/types';
import React from 'react';

interface ListProps {
  places: Place[];
  isLoading: any;
}

const List: React.FC<ListProps> = ({ places, isLoading }) => {
  return (
    <div className="p-6">
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
          <Grid container spacing={3} className="h-[85vh] overflow-auto">
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

export default List;
