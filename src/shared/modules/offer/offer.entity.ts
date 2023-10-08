import {
  Ref,
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { HousingType, Location, City } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: [10, 'Min length for title is 10'],
    maxlength: [100, 'Max length for title is 100'],
  })
  public title: string;

  @prop({
    trim: true,
    required: true,
    minlength: [20, 'Min length for title is 20'],
    maxlength: [1024, 'Max length for title is 1024'],
  })
  public description: string;

  @prop({ required: true })
  public date: Date;

  @prop({
    required: true,
  })
  public city: City;

  @prop({ required: true })
  public imagePreview: string;

  @prop({
    required: true,
    validate: (value: string[]): boolean => value.length === 6,
  })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType,
  })
  public type: HousingType;

  @prop({
    required: true,
    min: [1, 'Min bedrooms for offer is 1'],
    max: [8, 'Max bedrooms for offer is 8'],
  })
  public bedrooms: number;

  @prop({
    required: true,
    min: [1, 'Min adults for offer is 1'],
    max: [10, 'Max adults for offer is 10'],
  })
  public maxAdults: number;

  @prop({
    required: true,
    min: [100, 'Min price for offer is 100'],
    max: [100000, 'Max price for offer is 100000'],
  })
  public price: number;

  @prop({ required: true })
  public goods: string[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public hostId: Ref<UserEntity>;

  @prop({ required: true })
  public reviewCount: number;

  @prop({ required: true })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
