import React, { useState, useEffect, createRef } from 'react';
import {
  CircularProgress,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import { formControl } from './styles';
import { useTheme } from '@mui/material/styles';
import { PlaceDetails } from '../PlaceDetails/PlaceDetails';

interface ListProps {
  places: any;
  type: any;
  setType: any;
  rating: any;
  setRating: any;
  childClicked: any;
  isLoading: any;
}

const List: React.FC<ListProps> = (
  {
    // places,
    // type,
    // setType,
    // rating,
    // setRating,
    // childClicked,
    // isLoading,
  }
) => {
  // const [elRefs, setElRefs] = useState([]);
  const theme = useTheme();
  const [rating, setRating] = useState('');
  const [type, setType] = useState('');
  const places = [
    { name: 'hi1' },
    { name: 'hi2' },
    { name: 'hi3' },
    { name: 'hi4' },
    { name: 'hi5' },
    { name: 'hi6' },
  ];
  const isLoading = false;
  // useEffect(() => {
  //   setElRefs((refs) =>
  //     Array(places.length)
  //       .fill(null)
  //       .map((_, i) => refs[i] || createRef())
  //   );
  // }, [places]);

  return (
    <div className="p-7">
      <Typography variant="h4">Food</Typography>
      {isLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl sx={formControl(theme)}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={formControl(theme)}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className="h-[75vh]">
            {places?.map((place: any, i: number) => (
              <Grid key={i} size={{ xs: 14 }}>
                <PlaceDetails
                  // selected={Number(childClicked) === i}
                  // refProp={elRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
