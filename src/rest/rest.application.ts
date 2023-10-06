import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { UserModel } from '../shared/modules/user/index.js';

@injectable()
export class RestApplication {
  constructor(
    /**С помощь декоратора реализация компонентов будет добавлена автоматически
     * без указания параметров при вызове RestApplication
     */
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient
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

    const user = await UserModel.create({
      username: 'Keks',
      email: 'test@mail.local',
      avatar: 'avatar.jpg',
      password: '123456',
      userType: 'pro',
    });

    console.log(user);

    this.logger.info('Init database completed');
  }
}
