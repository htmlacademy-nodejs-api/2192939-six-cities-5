import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Config, RestSchema, configRestSchema } from './index.js';
import { Logger } from '../logger/index.js';
import chalk from 'chalk';
import { Component } from '../../types/index.js';

const ERR_PARSE = "Can't read file. Perhaps the file does not exists.";
const INFO_SUCCESS = '.env file found and successfully parsed!';

/**Через параметр типа передаем RestSchema и будем получать информацию только о существующих настройках */
@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    /**Загружает конфигурацию из файла .env в process.env */
    const parsedOutput = config();
    if (parsedOutput.error) {
      throw new Error(ERR_PARSE);
    }

    /**Неявно считывается объект process.env */
    configRestSchema.load({});
    /**Осуществляем валидацию переменных */
    try {
      configRestSchema.validate({
        allowed: 'strict',
        output: this.logger.info,
      });
    } catch {
      const err = new Error(chalk.red("Can't validate process.env"));
      this.logger.error('Error:', err);
    }

    /**Записывает записывает провалидированные настройки в переменные окружения среды */
    this.config = configRestSchema.getProperties();
    this.logger.info(INFO_SUCCESS);
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
