import 'reflect-metadata';
import { fileURLToPath } from 'node:url';
import { CLIApplication, Command } from './cli/index.js';
import { dirname, resolve } from 'node:path';
import { readdirSync } from 'node:fs';

const COMMAND_DIR = './cli/commands/';
const regularExpression = new RegExp(/.command/);

/**Точка входа приложения */
async function bootstrap() {
  /**Считываем все команды из директории ./commands */
  const filename = fileURLToPath(import.meta.url);
  const filepath = dirname(filename);
  const commandPath = resolve(filepath, COMMAND_DIR);

  const commandFileNames = readdirSync(commandPath)
    .filter((commandFileName) => regularExpression.test(commandFileName))
    .map((commandFileName) => commandFileName.replace('ts', 'js'));

  const commands = [];
  for (let i = 0; i < commandFileNames.length; i++) {
    const commandName: Array<{ new (...args: unknown[]): Command }> =
      await import(COMMAND_DIR + commandFileNames[i]);

    const [command] = Object.values(commandName);
    commands.push(new command());
  }

  /**Создает экземпляр класса  CLIApplication*/
  const cliApplication = new CLIApplication();

  /**Регистрирует команды */
  cliApplication.registerCommands(commands);

  /**Запускает processCommand и передает в него все данные, переданные вызываемому скрипту */
  cliApplication.processCommand(process.argv);
}

bootstrap();
