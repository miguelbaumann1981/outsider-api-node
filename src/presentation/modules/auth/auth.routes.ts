import { Router } from 'express';
import { AuthService } from '../../services';
import { AuthController } from './auth.controller';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthService();
    const controller = new AuthController(authService);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);
    router.put('/recover-password', controller.recoverPassword);
    router.get('/check-status', controller.checkAuthStatus);

    return router;
  }
}
