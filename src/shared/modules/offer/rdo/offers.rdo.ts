import { Expose, Transform } from 'class-transformer';
import { City, HousingType, Location } from '../../../types/index.js';

export class OffersRdo {
  @Expose()
  @Transform((query) => query.obj['_id'])
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: City;

  @Expose()
  public imagePreview: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public price: number;

  @Expose()
  public reviewCount: number;

  @Expose()
  public location: Location;
}
