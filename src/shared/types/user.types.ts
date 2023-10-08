import { UserType } from './index.js';

export type User = {
  username: string;
  email: string;
  avatar: string;
  userType: UserType;
};
