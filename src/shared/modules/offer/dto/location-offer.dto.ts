import { Type } from 'class-transformer';
import { IsLatitude, IsNumber } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class LocationDto {
  @IsNumber()
  @Type(() => Number)
  @IsLatitude({ message: CreateOfferValidationMessage.location.invalidType })
  public latitude: number;

  @IsNumber()
  @Type(() => Number)
  @IsLatitude({ message: CreateOfferValidationMessage.location.invalidType })
  public longitude: number;

  @IsNumber()
  @Type(() => Number)
  public zoom: number;
}
