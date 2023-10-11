import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface ReviewEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'reviews',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class ReviewEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 1024,
    default: '',
  })
  public text: string;

  @prop({ required: true, min: 1, max: 5, default: 0 })
  public rating: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;

  @prop({
    ref: OfferEntity,
    required: true,
  })
  public offerId: Ref<OfferEntity>;
}

export const ReviewModel = getModelForClass(ReviewEntity);
