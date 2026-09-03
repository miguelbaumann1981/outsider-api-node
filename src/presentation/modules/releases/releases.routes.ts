import { Router } from 'express';
import { ReleasesService } from '../../services';
import { ReleasesController } from './releases.controller';

export class ReleasesRoutes {
  static get routes(): Router {
    const router = Router();
    const releasesService = new ReleasesService();
    const controller = new ReleasesController(releasesService);

    router.get('/', controller.getReleases);
    router.post('/', controller.createRelease);
    router.put('/:id', controller.updateRelease);

    return router;
  }
}
