import { getErrorMessage } from '../../shared/helpers/common.js';
import { createOffer } from '../../shared/helpers/offer.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onCompleteImport(count: number) {
    console.log(`${count} rows imported`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) throw err;

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(err)));
    }
  }
}
