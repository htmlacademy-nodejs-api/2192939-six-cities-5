import { Host } from './host.types.js';
import { Location } from './location.types.js';

export type Offer = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  images: string[];
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  goods: string[];
  host: Host;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
};
