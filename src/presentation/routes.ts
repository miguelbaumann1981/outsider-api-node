import { Router } from 'express';
import { ArticlesRoutes } from './modules/articles/articles.routes';
import { AuthRoutes } from './modules/auth/auth.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/articles', ArticlesRoutes.routes);
    return router;
  }
}
