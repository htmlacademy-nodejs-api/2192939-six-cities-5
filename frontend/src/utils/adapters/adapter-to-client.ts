import { City, Location } from '../../types/types';

export const adaptLocationToClient = (location: Location): Location => ({
  latitude: location.latitude,
  longitude: location.longitude,
});

export const adaptCityToClient = (city: City): City => ({
  name: city.name,
  location: adaptLocationToClient(city.location),
});
