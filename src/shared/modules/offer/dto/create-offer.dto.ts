import {
  Length,
  IsDateString,
  MaxLength,
  IsBoolean,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { City, HousingType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { LocationDto } from './location-offer.dto.js';

export class CreateOfferDto {
  @Length(10, 100, { message: CreateOfferValidationMessage.title.length })
  public title: string;

  @Length(20, 1024, {
    message: CreateOfferValidationMessage.description.length,
  })
  public description: string;

  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.date.invalidFormat }
  )
  public date: Date;

  @ValidateNested({ message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @MaxLength(256, {
    message: CreateOfferValidationMessage.imagePreview.maxLength,
  })
  public imagePreview: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidType })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.length })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(HousingType, {
    each: true,
    message: CreateOfferValidationMessage.type.invalid,
  })
  public type: HousingType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidType })
  public goods: string[];

  public hostId: string;

  @ValidateNested({
    message: CreateOfferValidationMessage.location.invalidType,
  })
  public location: LocationDto;
}
