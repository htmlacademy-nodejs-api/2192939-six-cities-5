import { City, Location } from './index.js';

export type Offer = {
  title: string;
  description: string;
  date: string;
  type: string;
  price: number;
  images: string[];
  city: City;
  imagePreview: string;
  location: Location;
  goods: string[];
  hostId: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  quantityReviews: number;
};
