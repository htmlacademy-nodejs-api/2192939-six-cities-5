import { Expose } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public username: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public isPro: boolean;

  @Expose()
  public favorites: ObjectId[];
}
