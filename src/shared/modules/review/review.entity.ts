import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';

export interface ReviewEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'reviews',
  },
})
export class ReviewEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 1024,
    default: '',
  })
  public text: string;

  @prop({ required: true, default: '' })
  public date!: Date;

  @prop({ required: true, min: 1, max: 5, default: 0 })
  public rating: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const ReviewModel = getModelForClass(ReviewEntity);
