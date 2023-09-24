import { CLIApplication } from './cli/cli-application.js';
import { HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  console.log(process.argv);

  cliApplication.processCommand(process.argv);
}

bootstrap();
