import { UserDto } from '../users/user.dto.js';

export class CreateReviewDto {
  public id!: string;

  public text!: string;

  public data!: string;

  public rating!: number;

  public user!: UserDto;
}
