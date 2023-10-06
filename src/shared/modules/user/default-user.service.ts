import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto, UserEntity, UserModel, UserService } from './index.js';

export class DefaultUserService implements UserService {
  public async create(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    return UserModel.create(user);
  }
}
