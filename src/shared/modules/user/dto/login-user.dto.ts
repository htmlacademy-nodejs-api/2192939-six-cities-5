import { IsEmail, IsString } from 'class-validator';
import { LoginUserMessages } from '../index.js';

export class LoginUserDto {
  @IsEmail({}, { message: LoginUserMessages.email.invalidEmail })
  public email: string;

  @IsString({ message: LoginUserMessages.password.invalidPassword })
  public password: string;
}
