import { Location } from './location.types.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  types: string[];
  images: string[];
  cities: { name: string; location: Location }[];
  locations: Location[];
  goods: string[];
};
