import { inject, injectable } from 'inversify';
import { Component } from '../../../types/component.enum.js';
import { Config } from '../../config/config.interface.js';
import { RestSchema } from '../../config/rest.schema.js';
import { STATIC_UPLOAD_ROUTE } from '../../../../rest/rest.constants.js';
import { getFullServerPath } from '../../../helpers/common.js';
import { Logger } from '../../logger/logger.interface.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../../../modules/offer/offer.entity.js';

@injectable()
export class ImagesPathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    this.logger.info('Images path transformer created!');
  }

  public execute(
    data: DocumentType<OfferEntity> | null
  ): DocumentType<OfferEntity> | null {
    const uploadPath = STATIC_UPLOAD_ROUTE;
    const serverHost = this.config.get('HOST');
    const serverPort = this.config.get('PORT');

    if (data !== null) {
      data.images = data.images.map(
        (image) =>
          `${getFullServerPath(serverHost, serverPort)}${uploadPath}/${image}`
      );
    }
    console.log(data);
    return data;
  }
}
