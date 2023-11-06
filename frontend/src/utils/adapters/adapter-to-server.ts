import { CreateUserDto } from '../../dto/users/create-user.dto';
import { UserRegister } from '../../types/types';

export const adaptUserType = (type: string): boolean => type === 'pro';

export const adaptCreateUser = (user: UserRegister): CreateUserDto => ({
  username: user.name,
  email: user.email,
  avatar: user.avatar?.name as string,
  password: user.password,
  isPro: adaptUserType(user.type),
});
