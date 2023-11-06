import {
  Length,
  MaxLength,
  IsBoolean,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsInt,
  Min,
  Max,
  IsMongoId,
  IsOptional,
  ArrayMaxSize,
} from 'class-validator';
import { City, HousingType, Location } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';
import {
  BedroomsValue,
  DescriptionLength,
  IMAGE_PREVIEW_MAX_LENGTH,
  MaxAdultsValue,
  NUMBER_OF_IMAGES,
  PriceValue,
  TitleLength,
} from './offer-dto.constants.js';

export class UpdateOfferDto {
  @IsOptional()
  @Length(TitleLength.min, TitleLength.max, {
    message: UpdateOfferValidationMessage.title.length,
  })
  public title?: string;

  @IsOptional()
  @Length(DescriptionLength.min, DescriptionLength.max, {
    message: UpdateOfferValidationMessage.description.length,
  })
  public description?: string;

  @IsOptional()
  @ValidateNested({ message: UpdateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @MaxLength(IMAGE_PREVIEW_MAX_LENGTH, {
    message: UpdateOfferValidationMessage.imagePreview.maxLength,
  })
  public imagePreview?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.images.invalidType })
  @ArrayMinSize(NUMBER_OF_IMAGES, {
    message: UpdateOfferValidationMessage.images.length,
  })
  @ArrayMaxSize(NUMBER_OF_IMAGES, {
    message: UpdateOfferValidationMessage.images.length,
  })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(HousingType, {
    each: true,
    message: UpdateOfferValidationMessage.type.invalid,
  })
  public type?: HousingType;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(BedroomsValue.min, {
    message: UpdateOfferValidationMessage.bedrooms.minValue,
  })
  @Max(BedroomsValue.max, {
    message: UpdateOfferValidationMessage.bedrooms.maxValue,
  })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(MaxAdultsValue.min, {
    message: UpdateOfferValidationMessage.maxAdults.minValue,
  })
  @Max(MaxAdultsValue.max, {
    message: UpdateOfferValidationMessage.maxAdults.maxValue,
  })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(PriceValue.min, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(PriceValue.max, { message: UpdateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.goods.invalidType })
  public goods?: string[];

  @IsOptional()
  @IsMongoId({ message: UpdateOfferValidationMessage.hostId.invalidType })
  public hostId?: string;

  @IsOptional()
  @ValidateNested({
    message: UpdateOfferValidationMessage.location.invalidType,
  })
  public location?: Location;
}
