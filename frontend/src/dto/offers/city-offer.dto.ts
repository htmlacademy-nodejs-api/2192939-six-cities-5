import { CityName } from '../../../../src/shared/types/city-name.enum.js';
import { LocationDto } from './location-offer.dto.js';

export class CityDto {
  name!: CityName;
  location!: LocationDto;
}
