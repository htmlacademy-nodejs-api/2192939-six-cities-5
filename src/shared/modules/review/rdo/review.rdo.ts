import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class ReviewRdo {
  @Expose()
  public text: string;

  @Expose({ name: 'createdAt' })
  public date: string;

  @Expose()
  public rating: number;

  @Expose()
  @Type(() => UserRdo)
  public userId: UserRdo;
}
