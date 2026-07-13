import { Request, Response } from 'express';
import { handleControllerError } from '../../../domain/errors';
import { ReleasesService } from '../../services';

export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  getReleases = async (req: Request, res: Response) => {
    this.releasesService
      .getReleases()
      .then((releases) => res.json(releases))
      .catch((error) => handleControllerError(error, res));
  };
}
