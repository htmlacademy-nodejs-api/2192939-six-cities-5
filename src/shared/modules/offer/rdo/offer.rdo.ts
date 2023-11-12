import { Expose, Transform, Type } from 'class-transformer';
import { City, HousingType, Location } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  @Transform((query) => query.obj['_id'])
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: City;

  @Expose()
  public imagePreview: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: string[];

  @Expose({ name: 'hostId' })
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  public reviewCount: number;

  @Expose()
  public location: Location;
}
