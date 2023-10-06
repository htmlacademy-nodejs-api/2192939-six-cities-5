import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';

/**Точка входа в RestApplication */
async function bootstrap() {
  /**Создается контейнер */
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer()
  );
  /**В контейнер добавляются реализации компонентов */

  /**Из контейнера вызывается реализация RestApplication и уже без параметров */
  const application = appContainer.get<RestApplication>(
    Component.RestApplication
  );
  await application.init();
}

bootstrap();
