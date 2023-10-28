import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CreateReviewDtoMessages } from './create-review.messages.js';

export class CreateReviewDto {
  @IsString({ message: CreateReviewDtoMessages.text.invalidFormat })
  @Length(5, 1024, { message: CreateReviewDtoMessages.text.lengthText })
  public text: string;

  @IsInt({ message: CreateReviewDtoMessages.rating.invalidFormat })
  @Min(1, { message: CreateReviewDtoMessages.rating.minValue })
  @Max(5, { message: CreateReviewDtoMessages.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateReviewDtoMessages.userId.invalidFormat })
  public userId: string;

  public offerId: string;
}
