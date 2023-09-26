import { CLIApplication } from './cli/index.js';
import {
  HelpCommand,
  ImportCommand,
  VersionCommand,
  GenerateCommand,
} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
