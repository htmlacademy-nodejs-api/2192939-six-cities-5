import { NextFunction, Request, Response } from 'express';
import { Middleware } from './middleware.interface.js';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';

export class UploadFilesMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string
  ) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtension = extension(file.mimetype);
        const filename = nanoid();

        callback(null, `${filename}.${fileExtension}`);
      },
    });

    const uploadMultipleFileMiddleware = multer({ storage }).array(
      this.fieldName
    );

    uploadMultipleFileMiddleware(req, res, next);
  }
}
