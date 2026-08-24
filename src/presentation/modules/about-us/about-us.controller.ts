import { Request, Response } from 'express';
import { handleControllerError } from '../../../domain/errors';
import { AboutUsService } from '../../services';

export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  getAboutUsInfo = async (req: Request, res: Response) => {
    this.aboutUsService
      .getAboutUsInfo()
      .then((info) => res.json(info))
      .catch((error) => handleControllerError(error, res));
  };
}
