import { Response, Router } from 'express';
import { Route } from '../index.js';

export interface Controller {
  /**
   * Будет возвращать экземпляр роутера
   */
  readonly router: Router;
  /**
   * Будет инкапсулировать код для регистрации обработчиков
   */
  addRoute(route: Route): void;
  /**
   * Функции-обертки (хэлперы) над однотипными функциями express
   */
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
}
