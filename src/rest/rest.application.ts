import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { Controller, ExceptionFilter } from '../shared/libs/rest/index.js';
import { UserController } from '../shared/modules/user/user.controller.js';

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
    private readonly reviewController: Controller
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
  }

  private async _initMiddleware() {
    this.server.use(express.json());
  }

  private async _initExceptionFilter() {
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
      `Server started on http://localhost:${this.config.get('PORT')}`
    );
  }
}
