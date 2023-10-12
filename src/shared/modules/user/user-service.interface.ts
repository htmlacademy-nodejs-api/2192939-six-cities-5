import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto, UserEntity } from './index.js';

export interface UserService {
  /**
   * Создание нового пользователя
   */
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
}
