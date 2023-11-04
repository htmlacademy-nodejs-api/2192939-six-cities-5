import { City, Type } from '../../types/types';
import { UserDto } from '../users/user.dto';

export class OfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public date!: Date;

  public city!: City;

  public imagePreview!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: Type;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: string[];

  public host!: UserDto;

  public reviewCount!: number;

  public location!: Location;
}
