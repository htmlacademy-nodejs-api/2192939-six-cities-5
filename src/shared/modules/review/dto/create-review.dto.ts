import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CreateReviewDtoMessages } from './create-review.messages.js';

enum TextLength {
  min = 5,
  max = 1024,
}

enum RatingValue {
  min = 1,
  max = 5,
}
export class CreateReviewDto {
  @IsString({ message: CreateReviewDtoMessages.text.invalidFormat })
  @Length(TextLength.min, TextLength.max, {
    message: CreateReviewDtoMessages.text.lengthText,
  })
  public text: string;

  @IsInt({ message: CreateReviewDtoMessages.rating.invalidFormat })
  @Min(RatingValue.min, { message: CreateReviewDtoMessages.rating.minValue })
  @Max(RatingValue.max, { message: CreateReviewDtoMessages.rating.maxValue })
  public rating: number;

  public userId: string;

  @IsMongoId({ message: CreateReviewDtoMessages.offerId.invalidFormat })
  public offerId: string;
}
