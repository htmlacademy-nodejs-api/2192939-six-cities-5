import { DocumentType } from '@typegoose/typegoose';
import { CreateReviewDto, ReviewEntity } from './index.js';

export interface ReviewService {
  create(dto: CreateReviewDto): Promise<DocumentType<ReviewEntity>>;
  findByUserId(
    userId: string
  ): Promise<Array<DocumentType<ReviewEntity> | null>>;
}
