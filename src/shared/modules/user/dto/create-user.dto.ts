import {
  Length,
  IsEmail,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { CreateUserMessages } from '../index.js';

export class CreateUserDto {
  @Length(1, 15, { message: CreateUserMessages.username.invalidName })
  public username: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidEmail })
  public email: string;

  @IsOptional()
  @MaxLength(256, { message: CreateUserMessages.avatar.invalid })
  public avatar?: string;

  @Length(6, 12, { message: CreateUserMessages.password.invalidPassword })
  public password: string;

  @IsBoolean({ message: CreateUserMessages.isPro.invalidType })
  public isPro: boolean;
}
