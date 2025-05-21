import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Cuisine, Place } from './types';
import imagePlaceholder from './restaurent_placeholder.jpg';

interface PlaceDetailsProps {
  place: Place;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place }) => {
  return (
    place.name && (
      <Card elevation={8} className="m-4">
        <CardMedia
          style={{ height: 350 }}
          image={place.photo ? place.photo.images.large.url : imagePlaceholder}
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <Typography component="legend">
              {place.num_reviews} review{place.num_reviews > 1 && 's'}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price_level}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>
          {place?.awards?.map((award: any) => (
            <Box
              display="flex"
              justifyContent="space-between"
              my={1}
              alignItems="center"
            >
              <img src={award.images.small} />
              <Typography variant="subtitle2" color="textSecondary">
                {award.display_name}
              </Typography>
            </Box>
          ))}
          {place?.cuisine?.map((item: Cuisine) => (
            <Chip
              label={`${item.name}`}
              size="small"
              sx={{
                margin: '5px 5px 5px 0',
              }}
            />
          ))}
          {place.address && (
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1rem',
              }}
            >
              <LocationOnIcon />
              {place.address}
            </Typography>
          )}
          {place.phone && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <PhoneIcon /> {place.phone}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {place.web_url && (
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.web_url, '_blank')}
            >
              Trip Advisor
            </Button>
          )}
          {place.website && (
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.website, '_blank')}
            >
              Website
            </Button>
          )}
        </CardActions>
      </Card>
    )
  );
};
