import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class ReviewRdo {
  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  public text: string;

  @Expose({ name: 'createdAt' })
  public data: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;
}
