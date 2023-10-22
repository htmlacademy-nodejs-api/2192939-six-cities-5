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
import { CreateOfferValidationMessage } from '../index.js';

export class UpdateOfferDto {
  @IsOptional()
  @Length(10, 100, { message: CreateOfferValidationMessage.title.length })
  public title?: string;

  @IsOptional()
  @Length(20, 1024, {
    message: CreateOfferValidationMessage.description.length,
  })
  public description?: string;

  @IsOptional()
  @ValidateNested({ message: CreateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @MaxLength(256, {
    message: CreateOfferValidationMessage.imagePreview.maxLength,
  })
  public imagePreview?: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.images.invalidType })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.length })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(HousingType, {
    each: true,
    message: CreateOfferValidationMessage.type.invalid,
  })
  public type?: HousingType;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.goods.invalidType })
  public goods?: string[];

  @IsOptional()
  @IsMongoId({ message: CreateOfferValidationMessage.hostId.invalidType })
  public hostId?: string;

  @IsOptional()
  @ValidateNested({
    message: CreateOfferValidationMessage.location.invalidType,
  })
  public location?: Location;
}
