import { Host } from './host.types.js';
import { Location } from './location.types.js';

export type MockServerData = {
  title: string[];
  description: string[];
  type: string[];
  images: string[];
  city: { name: string; location: Location }[];
  location: Location[];
  goods: string[];
  host: Host[];
};
