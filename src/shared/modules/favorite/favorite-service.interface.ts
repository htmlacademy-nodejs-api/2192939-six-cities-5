import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';

export interface FavoriteService {
  /**
   * Получение списка предложений, добавленных в избранное
   */
  getFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null>;
  /**
   * Добавление/удаление предложения в/из избранное
   */
  setFavoriteById(
    offerId: string,
    status: string,
    userId: string
  ): Promise<DocumentType<OfferEntity> | null>;
}
