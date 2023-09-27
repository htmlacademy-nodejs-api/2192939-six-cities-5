import { CLIApplication } from './cli/index.js';
import {
  HelpCommand,
  ImportCommand,
  VersionCommand,
  GenerateCommand,
} from './cli/index.js';

/**Точка входа приложения */
function bootstrap() {
  /**Создает экземпляр класса  CLIApplication*/
  const cliApplication = new CLIApplication();
  /**Регистрирует команды */
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  /**Запускает processCommand и передает в него все данные, переданные вызываемому скрипту */
  cliApplication.processCommand(process.argv);
}

bootstrap();
