import { Container } from 'inversify';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { DefaultFavoriteService } from './default-favorite.service.js';
import { Controller } from '../../libs/rest/index.js';
import { FavoriteController } from './favorite.controller.js';

export function createFavoriteContainer() {
  const favoriteContainer = new Container();
  favoriteContainer
    .bind<FavoriteService>(Component.FavoriteService)
    .to(DefaultFavoriteService)
    .inSingletonScope();
  favoriteContainer
    .bind<Controller>(Component.FavoriteController)
    .to(FavoriteController)
    .inSingletonScope();

  return favoriteContainer;
}
