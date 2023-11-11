import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class ReviewRdo {
  @Expose()
  @Transform((query) => query.obj['_id'])
  public id: string;

  @Expose()
  public comment: string;

  @Expose({ name: 'createdAt' })
  public date: string;

  @Expose()
  public rating: number;

  @Expose()
  @Transform((query) => query.obj[query.key])
  @Type(() => UserRdo)
  public user: UserRdo;
}
