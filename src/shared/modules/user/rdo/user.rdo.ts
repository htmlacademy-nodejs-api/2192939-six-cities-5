import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserRdo {
  @Expose()
  @Transform((query) => query.obj[query.key])
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
