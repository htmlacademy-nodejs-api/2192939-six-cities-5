import { RestApplication } from './rest/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

/**Точка входа в RestApplication */
async function bootstrap() {
  /**Создает экземпляр логгера */
  const logger = new PinoLogger();

  /**Создает экземпляр RestApplication и передает в качестве параметра экземпляр логгера */
  const application = new RestApplication(logger);
  /**Инициализирует приложение */
  await application.init();
}

bootstrap();
