import { Router } from 'express';
import { EmailService } from '../../services';
import { ContactController } from './contact.controller';

export class ContactRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService();
    const controller = new ContactController(emailService);

    router.post('/', controller.sendEmail);

    return router;
  }
}
