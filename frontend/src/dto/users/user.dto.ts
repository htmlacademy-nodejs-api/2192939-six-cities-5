import { ObjectId } from 'mongoose';

export class UserDto {
  public id!: string;

  public username!: string;

  public email!: string;

  public avatar!: string;

  public isPro!: boolean;

  public favorites!: ObjectId[];
}
