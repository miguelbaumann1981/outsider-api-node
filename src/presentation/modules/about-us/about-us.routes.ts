import { Router } from 'express';
import { AboutUsService } from '../../services';
import { AboutUsController } from './about-us.controller';

export class AboutUsRoutes {
  static get routes(): Router {
    const router = Router();
    const aboutUsService = new AboutUsService();
    const controller = new AboutUsController(aboutUsService);

    router.get('/', controller.getAboutUsInfo);
    router.post('/', controller.createAboutUsInfo);
    router.put('/:id', controller.updateAboutUsInfo);

    return router;
  }
}
