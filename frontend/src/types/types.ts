import { CITIES, Sorting, TYPES } from '../const';

export type CityName = (typeof CITIES)[number];
export type Type = (typeof TYPES)[number];
export type SortName = keyof typeof Sorting;

export type Location = {
  latitude: number;
  longitude: number;
};

export type City = {
  name: CityName;
  location: Location;
};

export type User = {
  username: string;
  avatar: string;
  type: boolean;
  email: string;
};

export type Comment = {
  text: string;
  date: string;
  rating: number;
  offerId: string;
  userId: User;
};

export type Offer = {
  id: string;
  price: number;
  rating: number;
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  city: City;
  location: Location;
  imagePreview: string;
  type: Type;
  bedrooms: number;
  description: string;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};

export type NewOffer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  imagePreview: string;
  isPremium: boolean;
  type: Type;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  location: Location;
  images: string[];
};

export type NewComment = Pick<Comment, 'text' | 'rating'>;
export type CommentAuth = NewComment & Pick<Offer, 'id'>;
export type UserAuth = Pick<User, 'email'> & { password: string };
export type FavoriteAuth = Offer['id'];
export type UserRegister = Omit<User, 'avatarUrl'> &
  Pick<UserAuth, 'password'> & { avatar?: File };
