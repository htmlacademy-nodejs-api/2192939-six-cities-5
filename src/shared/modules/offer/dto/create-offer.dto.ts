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
  ArrayMaxSize,
} from 'class-validator';
import { City, HousingType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { LocationDto } from './location-offer.dto.js';
import {
  BedroomsValue,
  DescriptionLength,
  IMAGE_PREVIEW_MAX_LENGTH,
  MaxAdultsValue,
  NUMBER_OF_IMAGES,
  PriceValue,
  TitleLength,
} from './offer-dto.constants.js';

export class CreateOfferDto {
  @Length(TitleLength.min, TitleLength.max, {
    message: CreateOfferValidationMessage.title.length,
  })
  public title: string;

  @Length(DescriptionLength.min, DescriptionLength.max, {
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

  @MaxLength(IMAGE_PREVIEW_MAX_LENGTH, {
    message: CreateOfferValidationMessage.imagePreview.maxLength,
  })
  public imagePreview: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidType })
  @ArrayMinSize(NUMBER_OF_IMAGES, {
    message: CreateOfferValidationMessage.images.length,
  })
  @ArrayMaxSize(NUMBER_OF_IMAGES, {
    message: CreateOfferValidationMessage.images.length,
  })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(HousingType, {
    each: true,
    message: CreateOfferValidationMessage.type.invalid,
  })
  public type: HousingType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(BedroomsValue.min, {
    message: CreateOfferValidationMessage.bedrooms.minValue,
  })
  @Max(BedroomsValue.max, {
    message: CreateOfferValidationMessage.bedrooms.maxValue,
  })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(MaxAdultsValue.min, {
    message: CreateOfferValidationMessage.maxAdults.minValue,
  })
  @Max(MaxAdultsValue.max, {
    message: CreateOfferValidationMessage.maxAdults.maxValue,
  })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(PriceValue.min, { message: CreateOfferValidationMessage.price.minValue })
  @Max(PriceValue.max, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidType })
  public goods: string[];

  public hostId: string;

  @ValidateNested({
    message: CreateOfferValidationMessage.location.invalidType,
  })
  public location: LocationDto;
}
