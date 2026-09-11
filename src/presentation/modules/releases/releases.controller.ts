import { Request, Response } from 'express';
import { handleControllerError } from '../../../domain/errors';
import { ReleasesService } from '../../services';
import { ReleasesDto } from '../../../domain/dtos';
import { ReleaseModel } from '../../../data/mongo/models';

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

  bulkUpdateReleases = async (req: Request, res: Response) => {
    try {
      const updates = req.body;

      if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({
          message: 'AT_LEAST_ONE_RELEASE_MANDATORY',
        });
      }

      const operations = updates.map((u) => {
        if (!u.id) {
          throw new Error('RELEASE_ID_ITEM_MANDATORY');
        }

        const { id, ...fields } = u;

        return {
          updateOne: {
            filter: { _id: id },
            update: { $set: fields },
          },
        };
      });

      const result = await ReleaseModel.bulkWrite(operations, {
        ordered: true,
      });

      return res.status(200).json({
        message: 'ALL_RELEASES_UPDATED',
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      });
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };
}
