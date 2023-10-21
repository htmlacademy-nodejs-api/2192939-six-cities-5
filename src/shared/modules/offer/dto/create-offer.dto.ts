import { City, HousingType, Location } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public city: City;
  public imagePreview: string;
  public images: string[];
  public isPremium: boolean;
  public type: HousingType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: string[];
  public hostId: string;
  public location: Location;
}
