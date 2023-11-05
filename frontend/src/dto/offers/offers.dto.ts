import { HousingType } from './../../../../src/shared/types/housing-type.enum';
import { CityDto } from './city-offer.dto';
import { LocationDto } from './location-offer.dto';

export class OffersDto {
  public id!: string;

  public title!: string;

  public date!: Date;

  public city!: CityDto;

  public imagePreview!: string;

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: HousingType;

  public price!: number;

  public reviewCount!: number;

  public location!: LocationDto;
}
