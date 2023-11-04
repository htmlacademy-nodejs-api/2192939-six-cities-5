import { City, Type } from '../../types/types';

export class OffersDto {
  public id!: string;

  public title!: string;

  public date!: Date;

  public city!: City;

  public imagePreview!: string;

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: Type;

  public price!: number;

  public reviewCount!: number;

  public location!: Location;
}
