import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { DatabaseClient } from './index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../logger/index.js';
import { setTimeout } from 'node:timers/promises';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  /**Сохраняем экземпляр Mongoose в приватное свойство mongoose */
  private mongoose: typeof Mongoose;
  /**Флаг, указывающий на подключение к или отключение от БД */
  private isConnected: boolean;

  /**Через конструктор прокидываем Logger */
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    /**Инициализируем флаг */
    this.isConnected = false;
  }

  /**Метод, возвращающий текущее значение флага */
  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    /**Проверяет наличие подключения к БД */
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected.');
    }

    this.logger.info('Trying to connect to MongoDB...');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        /**Подключается к БД */
        console.log(uri);

        this.mongoose = await Mongoose.connect(
          'mongodb://admin:test@127.0.0.1:27017/six-cities?authSource=admin'
        );
        this.isConnected = true;

        this.logger.info('Database connection has established.');
        return;
      } catch (err) {
        attempt++;
        console.log(err);

        this.logger.info(
          `Filed to connect to the database. Attempt ${attempt}`
        );
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(
      `Unable to establish database connection after ${RETRY_COUNT}`
    );
  }

  public async disconnect(): Promise<void> {
    /**Проверяет наличие подключения к БД */
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database.');
    }

    /**Вызывает метод disconnect через опциональную цепочку
     * если вдруг mongoose не будет проинициализирован
     */
    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection has closed.');
  }
}
