import { Request, Response } from 'express';
import { handleControllerError } from '../../../domain/errors';
import { AboutUsService } from '../../services';
import { AboutUsDto } from '../../../domain/dtos';

export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  getAboutUsInfo = async (req: Request, res: Response) => {
    this.aboutUsService
      .getAboutUsInfo()
      .then((info) => res.json(info))
      .catch((error) => handleControllerError(error, res));
  };

  createAboutUsInfo = async (req: Request, res: Response) => {
    const [error, aboutUsDto] = AboutUsDto.create({ ...req.body });
    if (error) throw res.status(400).json({ error });

    this.aboutUsService
      .createAboutUsInfo(aboutUsDto!)
      .then((info) => res.status(201).json(info))
      .catch((error) => handleControllerError(error, res));
  };

  updateAboutUsInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = Array.isArray(id) ? id[0] : id;

    if (!parsedId) throw res.status(400).json({ error: 'INFO_REQUIRED' });

    this.aboutUsService
      .updateAboutUsInfo(parsedId, req.body)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleControllerError(error, res));
  };
}
