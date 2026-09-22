import { Router } from 'express';
import { ImageController } from './images.controller';

export class ImagesRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ImageController();

    router.get('/:img', controller.getImage);

    return router;
  }
}
