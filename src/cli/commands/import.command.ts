import { getErrorMessage } from '../../shared/helpers/index.js';
import { createOffer } from '../../shared/helpers/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from '../index.js';
import chalk from 'chalk';

const ERROR_IMPORT = "Can't import data from file:";

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  /**Вызывается когда произойдет событие 'line' */
  private async onImportedLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  /**Вызывается когда произойдет событие 'end' */
  private onCompleteImport(count: number) {
    console.log(`${count} rows imported`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    /**Создаем новый экземпляр объекта и передаем ему путь к файлу (концевые пробелы отбрасываем) */
    const fileReader = new TSVFileReader(filename.trim());

    /**Подписывается на события */
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      /**Вызывается у экземпляра fileReader метод read() */
      await fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) throw err;

      console.error(chalk.red(`${ERROR_IMPORT} ${filename}`));
      console.error(chalk.red(getErrorMessage(err)));
    }
  }
}
