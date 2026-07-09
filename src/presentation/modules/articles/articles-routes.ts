import { Router } from 'express';
import { ArticlesService } from '../../services';
import { ArticlesController } from './articles-controller';

export class ArticlesRoutes {
  static get routes(): Router {
    const router = Router();
    const articlesService = new ArticlesService();
    const controller = new ArticlesController(articlesService);

    router.get('/', controller.getArticles);

    return router;
  }
}
