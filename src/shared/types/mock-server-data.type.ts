import { Location, City } from './index.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  types: string[];
  images: string[];
  cities: City[];
  locations: Location[];
  goods: string[];
  isPremium: number[];
  username: string[];
  email: string[];
  avatar: string[];
  isPro: number[];
};
