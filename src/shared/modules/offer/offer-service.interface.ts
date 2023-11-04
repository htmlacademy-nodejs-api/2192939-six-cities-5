import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity, UpdateOfferDto } from './index.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  /**
   * Создание нового предложения
   */
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  /**
   * Редактирование предложения
   */
  updateById(
    offerId: string,
    userId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  /**
   * Удаление предложения
   */
  deleteById(
    offerId: string,
    userId: string
  ): Promise<DocumentType<OfferEntity> | null>;
  /**
   * Получение списка предложений по аренде
   */
  find(userId: string): Promise<DocumentType<OfferEntity>[]>;
  /**
   * Получение детальной информации о предложении
   */
  findById(
    offerId: string,
    userId?: string
  ): Promise<DocumentType<OfferEntity> | null>;
  /**
   * Получение списка премиальных предложений для города
   */
  getPremium(
    cityName: string,
    userId: string | undefined
  ): Promise<DocumentType<OfferEntity>[] | null>;
  /**
   * Проверяет существование записи в БД
   */
  exists(documentId: string): Promise<boolean>;
}
