import { Router } from 'express';
import { HomeLayoutService } from '../../services';
import { HomeLayoutController } from './home-layout.controller';

export class HomeLayoutRoutes {
  static get routes(): Router {
    const router = Router();

    const homeLayoutService = new HomeLayoutService();
    const controller = new HomeLayoutController(homeLayoutService);

    router.get('/', controller.getHomeLayoutArticles);

    return router;
  }
}
