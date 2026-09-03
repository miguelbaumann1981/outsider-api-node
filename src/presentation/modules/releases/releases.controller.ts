import { Request, Response } from 'express';
import { handleControllerError } from '../../../domain/errors';
import { ReleasesService } from '../../services';
import { ReleasesDto } from '../../../domain/dtos';

export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  getReleases = async (req: Request, res: Response) => {
    this.releasesService
      .getReleases()
      .then((releases) => res.json(releases))
      .catch((error) => handleControllerError(error, res));
  };

  createRelease = async (req: Request, res: Response) => {
    const [error, releaseDto] = ReleasesDto.create({ ...req.body });
    if (error) throw res.status(400).json({ error });

    this.releasesService
      .createRelease(releaseDto!)
      .then((info) => res.status(201).json(info))
      .catch((error) => handleControllerError(error, res));
  };

  updateRelease = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = Array.isArray(id) ? id[0] : id;

    if (!parsedId) throw res.status(400).json({ error: 'RELEASE_REQUIRED' });

    this.releasesService
      .updateRelease(parsedId, req.body)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleControllerError(error, res));
  };
}
