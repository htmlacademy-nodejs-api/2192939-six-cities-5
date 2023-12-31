import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createReviewContainer } from './shared/modules/review/index.js';
import { createFavoriteContainer } from './shared/modules/favorite/favorite.container.js';
import { createAuthContainer } from './shared/modules/auth/auth.container.js';

/**Точка входа в RestApplication */
async function bootstrap() {
  /**Создается контейнер */
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createReviewContainer(),
    createFavoriteContainer(),
    createAuthContainer()
  );

  /**Из контейнера вызывается реализация RestApplication и уже без параметров */
  const application = appContainer.get<RestApplication>(
    Component.RestApplication
  );
  await application.init();
}

bootstrap();
