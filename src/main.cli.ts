import { fileURLToPath } from 'node:url';
import { CLIApplication } from './cli/index.js';
import {
  // HelpCommand,
  ImportCommand,
  VersionCommand,
  GenerateCommand,
} from './cli/index.js';
import { dirname, resolve } from 'node:path';
import { readdirSync } from 'node:fs';

const COMMAND_DIR = './cli/commands/';
const regularExpression = new RegExp(/.command/);

/**Точка входа приложения */
async function bootstrap() {
  /**Создает экземпляр класса  CLIApplication*/
  const cliApplication = new CLIApplication();

  const filename = fileURLToPath(import.meta.url);
  const filepath = dirname(filename);
  const commandPath = resolve(filepath, COMMAND_DIR);
  console.log(commandPath);

  const commandFileNames = readdirSync(commandPath)
    .filter((commandFileName) => regularExpression.test(commandFileName))
    .map((commandFileName) => commandFileName.replace('ts', 'js'));
  for (let i = 0; i < commandFileNames.length; i++) {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const commandName = await import(COMMAND_DIR + commandFileNames[i]);
    console.log(commandName);

    const [command] = Object.values(commandName);
    console.log(command);
  }

  const path = `./cli/commands/help.command.js`;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const help = await import(path);
  const [command] = Object.values(help);

  /**Регистрирует команды */
  cliApplication.registerCommands([
    // new HelpCommand(),
    new command(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  /**Запускает processCommand и передает в него все данные, переданные вызываемому скрипту */
  cliApplication.processCommand(process.argv);
}

bootstrap();
