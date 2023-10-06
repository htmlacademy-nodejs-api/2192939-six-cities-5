import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { Review } from '../../types/index.js';

export interface ReviewEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'reviews',
  },
})
export class ReviewEntity extends defaultClasses.TimeStamps implements Review {
  @prop({ required: true, minlength: 5, maxlength: 1024, default: '' })
  public text: string;

  @prop({ required: true, default: '' })
  public date: Date | undefined;

  @prop({ required: true, min: 1, max: 5, default: 0 })
  public rating: number;

  @prop({ required: true })
  public userId: string;

  constructor(reviewData: Review) {
    super();

    this.text = reviewData.text;
    this.date = this.createdAt;
    this.rating = reviewData.rating;
    this.userId = reviewData.userId;
  }
}

export const ReviewModel = getModelForClass(ReviewEntity);
