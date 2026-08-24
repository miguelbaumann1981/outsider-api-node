import { Router } from 'express';
import { AboutUssService } from '../../services';
import { AboutUsController } from './about-us.controller';

export class AboutUsRoutes {
  static get routes(): Router {
    const router = Router();
    const aboutUsService = new AboutUssService();
    const controller = new AboutUsController(aboutUsService);

    router.get('/', controller.getAboutUsInfo);

    return router;
  }
}
