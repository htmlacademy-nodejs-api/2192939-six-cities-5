import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from './http-method.enum.js';
import { Middleware } from '../index.js';

export interface Route {
  /**
   * Путь к ресурсу
   */
  path: string;
  /**
   * HTTP метод
   */
  method: HttpMethod;
  /**
   * Функция обработчик запросов клиента
   * @param req - объект запроса
   * @param res - объект ответа
   * @param next - функция, которая передает запрос следующему обработчику
   */
  handler: (req: Request, res: Response, next: NextFunction) => void;

  middlewares?: Middleware[];
}
