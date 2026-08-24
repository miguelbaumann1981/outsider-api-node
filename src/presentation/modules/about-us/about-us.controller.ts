import { Request, Response } from 'express';
import { handleControllerError } from '../../../domain/errors';
import { AboutUssService } from '../../services';

export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUssService) {}

  getAboutUsInfo = async (req: Request, res: Response) => {
    this.aboutUsService
      .getAboutUsInfo()
      .then((info) => res.json(info))
      .catch((error) => handleControllerError(error, res));
  };
}
