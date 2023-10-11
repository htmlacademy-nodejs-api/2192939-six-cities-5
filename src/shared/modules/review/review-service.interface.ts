import { DocumentType } from '@typegoose/typegoose';
import { CreateReviewDto, ReviewEntity } from './index.js';

export interface ReviewService {
  /**
   * Добавление комментария для предложения
   */
  create(dto: CreateReviewDto): Promise<DocumentType<ReviewEntity>>;
  /**
   * Получение списка комментариев для предложения
   */
  findByOfferId(
    offerId: string
  ): Promise<Array<DocumentType<ReviewEntity>[] | null>>;
}
