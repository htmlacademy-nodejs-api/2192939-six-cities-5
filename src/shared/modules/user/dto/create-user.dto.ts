import { Length, IsEmail, IsBoolean } from 'class-validator';
import { CreateUserMessages } from './create-user.message.js';

enum UsernameLength {
  min = 1,
  max = 15,
}

enum PasswordLength {
  min = 6,
  max = 12,
}
export class CreateUserDto {
  @Length(UsernameLength.min, UsernameLength.max, {
    message: CreateUserMessages.username.invalidName,
  })
  public username: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidEmail })
  public email: string;

  @Length(PasswordLength.min, PasswordLength.max, {
    message: CreateUserMessages.password.invalidPassword,
  })
  public password: string;

  @IsBoolean({ message: CreateUserMessages.isPro.invalidType })
  public isPro: boolean;
}
