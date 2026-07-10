import { Router } from 'express';
import { ArticlesRoutes } from './modules/articles/articles.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/articles', ArticlesRoutes.routes);
    return router;
  }
}
