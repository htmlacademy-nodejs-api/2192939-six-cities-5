import { User } from './index.js';

export type Review = {
  text: string;
  date: Date;
  rating: number;
  user: User;
};
