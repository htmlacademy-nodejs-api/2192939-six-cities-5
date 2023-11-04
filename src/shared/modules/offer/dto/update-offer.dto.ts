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
} from 'class-validator';
import { City, HousingType, Location } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @Length(10, 100, { message: UpdateOfferValidationMessage.title.length })
  public title?: string;

  @IsOptional()
  @Length(20, 1024, {
    message: UpdateOfferValidationMessage.description.length,
  })
  public description?: string;

  @IsOptional()
  @ValidateNested({ message: UpdateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @MaxLength(256, {
    message: UpdateOfferValidationMessage.imagePreview.maxLength,
  })
  public imagePreview?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.images.invalidType })
  @ArrayMinSize(6, { message: UpdateOfferValidationMessage.images.length })
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
  @Min(1, { message: UpdateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: UpdateOfferValidationMessage.price.maxValue })
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
