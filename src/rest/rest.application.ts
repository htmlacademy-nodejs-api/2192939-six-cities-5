import { Logger } from '../shared/libs/logger/index.js';

export class RestApplication {
  /**В качестве параметра получает экземпляр логгера */
  constructor(private readonly logger: Logger) {}

  public async init() {
    /**Выводит информационное сообщение при инициализации приложения */
    this.logger.info('Application initialization');
  }
}
