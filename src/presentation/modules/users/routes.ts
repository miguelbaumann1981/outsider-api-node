import { Router } from 'express';
import { UsersService } from '../../services';
import { UsersController } from './controller';

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    const usersService = new UsersService();
    const controller = new UsersController(usersService);

    router.get('/', controller.getUsers);

    return router;
  }
}
