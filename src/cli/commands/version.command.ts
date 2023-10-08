import { readFileSync } from 'node:fs';
import { Command } from '../index.js';
import { resolve } from 'node:path';
import chalk from 'chalk';
import { getErrorMessage } from '../../shared/helpers/common.js';

/**
 * Описывает тип для свойства version
 */
type PackageJSONConfig = {
  version: string;
};

const ERROR_PARSE = 'Failed to parse json content.';
const ERROR_READ = 'Filed to read version from';

/**
 * Тайпгард проверяет что входной параметр соответствует типу PackageJSONConfig
 * Проверяем, что value является объектом, затем что value не равно null,
 * а также не является массивом (т. к. массив это объект), и последнее,
 * что у объекта есть свойство 'version'
 * Возвращается true или false
 */
function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

/**
 * Выводит версию приложения из файла package.json реализует интерфейс Command
 */
export class VersionCommand implements Command {
  constructor(private readonly filePath: string = './package.json') {}

  /**
   * Приватный метод, описывающий логику с файловой системой (синхронный)
   * @returns
   */
  private readVersion(): string {
    /**
     * readFileSync - встроенная синхронная функция чтения файла
     * 1-й параметр - путь к файлу, 2-й параметр - кодировка
     * resolve - встроенная функция позволяющая на основании относительного пути
     * получить абсолютный путь
     */
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    /**
     * Преобразовывает считанную из файла информацию (jsonContent) из строки json
     * в объект с помощью JSON.parse()
     * Так как возвращается тип объекта any, то устанавливаем некоторые проверки
     * объявляем тип unknown чтобы можно его было после уточнить
     */
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      /**
       * Если объект не является значением 'version', то пробрасываем ошибку
       */
      throw new Error(ERROR_PARSE);
    }

    /**
     * Если объект соответствует типу PackageJSONConfig, возвращаем его значение
     */
    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      /**
       * Считываем содержимое и выводим в консоль
       */
      const version = this.readVersion();
      console.info(chalk.cyan(version));
    } catch (err: unknown) {
      /**
       * В случае, если не удалось считать выводим сообщение
       */
      console.error(chalk.red(`${ERROR_READ} ${this.filePath}`));

      /**
       * Если ошибка принадлежит объекту Error, то выводим еще содержимое
       * поля message
       */
      console.error(chalk.red(getErrorMessage(err)));
    }
  }
}
