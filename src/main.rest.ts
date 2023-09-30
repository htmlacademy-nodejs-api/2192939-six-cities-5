import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

/**Точка входа в RestApplication */
async function bootstrap() {
  /**Создает экземпляр логгера */
  const logger = new PinoLogger();
  const config = new RestConfig(logger);

  /**Создает экземпляр RestApplication и передает в качестве параметра экземпляр логгера */
  const application = new RestApplication(logger, config);
  /**Инициализирует приложение */
  await application.init();
}

bootstrap();
