interface PlaceDetailsProps {
  place: any;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place }) => {
  return (
    <>
      <h1>{place.name}</h1>
    </>
  );
};
