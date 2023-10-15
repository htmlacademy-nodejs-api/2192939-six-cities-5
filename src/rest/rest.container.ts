import { Container } from 'inversify';
import { RestApplication } from './index.js';
import { Component } from '../shared/types/component.enum.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestSchema, RestConfig } from '../shared/libs/config/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../shared/libs/database-client/index.js';
import {
  DefaultExceptionFilter,
  ExceptionFilter,
} from '../shared/libs/rest/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  /**Интерфейс Logger привязывается к реализации PinoLogger
   * Для продакшена используется идентификатор Component.Logger
   */
  restApplicationContainer
    .bind<Logger>(Component.Logger)
    .to(PinoLogger)
    .inSingletonScope();
  restApplicationContainer
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  restApplicationContainer
    .bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient);
  restApplicationContainer
    .bind<ExceptionFilter>(Component.ExceptionFilter)
    .to(DefaultExceptionFilter);

  return restApplicationContainer;
}
