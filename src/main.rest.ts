import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { Component } from './shared/types/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from './shared/libs/database-client/index.js';

/**Точка входа в RestApplication */
async function bootstrap() {
  /**Создается контейнер */
  const container = new Container();
  /**В контейнер добавляются реализации компонентов */
  container
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  /**Интерфейс Logger привязывается к реализации PinoLogger
   * Для продакшена используется идентификатор Component.Logger
   */
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  container
    .bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient);

  /**Из контейнера вызывается реализация RestApplication и уже без параметров */
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
