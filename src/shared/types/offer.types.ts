import { City, HousingType, Location, User } from './index.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  type: HousingType;
  price: number;
  images: string[];
  city: City;
  imagePreview: string;
  location: Location;
  goods: string[];
  hostId: string;
  isPremium: boolean;
  bedrooms: number;
  maxAdults: number;
  user: User;
};
