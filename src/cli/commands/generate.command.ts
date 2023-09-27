import got from 'got';
import { MockServerData } from '../../shared/types/index.js';
import { Command } from '../index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import chalk from 'chalk';

const ERROR_GENERATE = "Can't generate data";
const ERROR_LOAD = "Can't load data from";

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  /**Загружает данные с сервера */
  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(chalk.red(`${ERROR_LOAD} ${url}`));
    }
  }

  /**Записывает сгенерированные данные в файл */
  private async write(filepath: string, offerCount: number) {
    /**Создает экземпляр класса TSVOfferGenerator */
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);

    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      /**Записывает информацию в файл построчно, вызывая метод generate() */
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  /**
   * Выполняет команду generate
   * @param count - количество данных
   * @param filepath - путь к файлу
   * @param url - адрес сервера с моковыми данными
   */
  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      /**Вызывает метод load */
      await this.load(url);
      /**Вызывает метод write  */
      await this.write(filepath, offerCount);
      /**Выводит информацию об успешно сгенерированном файле данных */
      console.info(`File ${filepath} was created`);
    } catch (err: unknown) {
      console.log(chalk.red(ERROR_GENERATE));
      console.error(chalk.red(getErrorMessage(err)));
    }
  }
}
