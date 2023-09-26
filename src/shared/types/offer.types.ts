import { Location } from './location.types.js';

export type Offer = {
  title: string;
  description: string;
  date: string;
  type: string;
  price: number;
  images: string[];
  city: {
    name: string;
    location: Location;
  };
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
