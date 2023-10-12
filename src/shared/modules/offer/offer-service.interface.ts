import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity, UpdateOfferDto } from './index.js';

export interface OfferService {
  /**
   * Создание нового предложения
   */
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  /**
   * Редактирование предложения
   */
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  /**
   * Удаление предложения
   */
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  /**
   * Получение списка предложений по аренде
   */
  find(): Promise<DocumentType<OfferEntity>[]>;
  /**
   * Получение детальной информации о предложении
   */
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  /**
   * Получение списка премиальных предложений для города
   */
  findPremium(cityName: string): Promise<DocumentType<OfferEntity>[] | null>;
  /**
   * Получение списка предложений, добавленных в избранное
   */
  findFavorites(): Promise<DocumentType<OfferEntity>[] | null>;
  /**
   * Добавление/удаление предложения в/из избранное
   */
  updateFavoriteById(
    offerId: string,
    status: number
  ): Promise<DocumentType<OfferEntity> | null>;
  /**
   * Проверяет существование записи в БД
   */
  exists(documentId: string): Promise<boolean>;
}
