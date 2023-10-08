import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  public username: string;
  public email: string;
  public avatar: string;
  public password: string;
  public userType: UserType;
}
