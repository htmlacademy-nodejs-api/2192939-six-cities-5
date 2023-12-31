import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import cors from 'cors';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getFullServerPath, getMongoURI } from '../shared/helpers/index.js';
import { Controller, ExceptionFilter } from '../shared/libs/rest/index.js';
import { UserController } from '../shared/modules/user/user.controller.js';
import { FavoriteController } from '../shared/modules/favorite/favorite.controller.js';
import ReviewController from '../shared/modules/review/review.controller.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/middleware/parse-token.middleware.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from './rest.constants.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    /**С помощь декоратора реализация компонентов будет добавлена автоматически
     * без указания параметров при вызове RestApplication
     */
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient,
    @inject(Component.OfferController)
    private readonly offerController: Controller,
    @inject(Component.ExceptionFilter)
    private readonly exceptionFilter: ExceptionFilter,
    @inject(Component.UserController)
    private readonly userController: UserController,
    @inject(Component.ReviewController)
    private readonly reviewController: ReviewController,
    @inject(Component.FavoriteController)
    private readonly favoriteController: FavoriteController,
    @inject(Component.AuthExceptionFilter)
    private readonly authExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter)
    private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter)
    private readonly validationExceptionFilter: ExceptionFilter
  ) {
    this.server = express();
  }

  /**
   * Получает строку подключения с помощью функции getMongoURI
   * в которую передаются переменные среды окружения с помощью метода config
   * @returns
   */
  public async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/reviews', this.reviewController.router);
    this.server.use('/favorite', this.favoriteController.router);
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(
      this.config.get('JWT_SECRET')
    );

    this.server.use(express.json());
    this.server.use(
      STATIC_UPLOAD_ROUTE,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(
      STATIC_FILES_ROUTE,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(
      authenticateMiddleware.execute.bind(authenticateMiddleware)
    );
    this.server.use(cors());
  }

  private async _initExceptionFilter() {
    this.server.use(
      this.authExceptionFilter.catch.bind(this.authExceptionFilter)
    );
    this.server.use(
      this.validationExceptionFilter.catch.bind(this.validationExceptionFilter)
    );
    this.server.use(
      this.httpExceptionFilter.catch.bind(this.httpExceptionFilter)
    );
    this.server.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    /**Выводит информационное сообщение при инициализации приложения */
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDb();

    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilter();
    this.logger.info('Exception filters initialization completed');
    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(
      `Server started on ${getFullServerPath(
        this.config.get('HOST'),
        this.config.get('PORT')
      )}}`
    );
  }
}
