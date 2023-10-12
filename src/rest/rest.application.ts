import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { OfferService } from '../shared/modules/offer/index.js';
// import { ReviewService } from '../shared/modules/review/index.js';

@injectable()
export class RestApplication {
  constructor(
    /**С помощь декоратора реализация компонентов будет добавлена автоматически
     * без указания параметров при вызове RestApplication
     */
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient,
    @inject(Component.OfferService) private readonly offerService: OfferService // @inject(Component.ReviewService)
    // private readonly reviewService: ReviewService
  ) {}

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

  public async init() {
    /**Выводит информационное сообщение при инициализации приложения */
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDb();

    this.logger.info('Init database completed');

    // Код для экспериментов

    // const dto = {
    //   text: 'string;',
    //   rating: 2,
    //   userId: '652741e6cc59a16b18b57259',
    //   offerId: '652741e6cc59a16b18b57256',
    // };
    // const result = await this.reviewService.create(dto);

    const result = await this.offerService.findById('652741e6cc59a16b18b57256');
    console.log(result);
  }
}
