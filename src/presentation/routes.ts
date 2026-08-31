import { Router } from 'express';
import { ArticlesRoutes } from './modules/articles/articles.routes';
import { AuthRoutes } from './modules/auth/auth.routes';
import { ReleasesRoutes } from './modules/releases/releases.routes';
import { HomeLayoutRoutes } from './modules/home-layout/home-layout.routes';
import { AboutUsRoutes } from './modules/about-us/about-us.routes';
import { ContactRoutes } from './modules/contact/contact.routes';
import { UsersRoutes } from './modules/users/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/articles', ArticlesRoutes.routes);
    router.use('/api/releases', ReleasesRoutes.routes);
    router.use('/api/layout-articles', HomeLayoutRoutes.routes);
    router.use('/api/about-us', AboutUsRoutes.routes);
    router.use('/api/contact', ContactRoutes.routes);
    router.use('/api/users', UsersRoutes.routes);
    return router;
  }
}
