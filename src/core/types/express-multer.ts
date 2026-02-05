import { Request } from 'express';
import { MulterFile } from 'multer';

export interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}
