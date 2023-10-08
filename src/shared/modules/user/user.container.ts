import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel, UserService } from './index.js';
import { Component } from '../../types/index.js';
import { DefaultUserService } from './index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer
    .bind<UserService>(Component.UserService)
    .to(DefaultUserService)
    .inSingletonScope();
  userContainer
    .bind<types.ModelType<UserEntity>>(Component.UserModel)
    .toConstantValue(UserModel);

  return userContainer;
}
