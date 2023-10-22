import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';

export interface FavoriteService {
  /**
   * Получение списка предложений, добавленных в избранное
   */
  getFavorites(): Promise<DocumentType<OfferEntity>[] | null>;
  /**
   * Добавление/удаление предложения в/из избранное
   */
  setFavoriteById(
    offerId: string,
    status: string
  ): Promise<DocumentType<OfferEntity> | null>;
}
