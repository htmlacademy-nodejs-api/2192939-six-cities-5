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
  HttpErrorExceptionFilter,
  ValidationExceptionFilter,
} from '../shared/libs/rest/index.js';
import { PathTransformer } from '../shared/libs/rest/transform/path.transformer.js';
import { ImagesPathTransformer } from '../shared/libs/rest/transform/images-path.transformer.js';

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
  restApplicationContainer
    .bind<ExceptionFilter>(Component.HttpExceptionFilter)
    .to(HttpErrorExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFilter>(Component.ValidationExceptionFilter)
    .to(ValidationExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<PathTransformer>(Component.PathTransformer)
    .to(PathTransformer)
    .inSingletonScope();
  restApplicationContainer
    .bind<ImagesPathTransformer>(Component.ImagesPathTransformer)
    .to(ImagesPathTransformer)
    .inSingletonScope();

  return restApplicationContainer;
}
