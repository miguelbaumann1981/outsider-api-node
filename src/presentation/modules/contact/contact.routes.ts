import { Router } from 'express';
import { EmailService } from '../../services';
import { ContactController } from './contact.controller';

export class ContactRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      process.env.RESEND_SENDER || '',
      process.env.RESEND_EMAIL || '',
      process.env.RESEND_API_KEY || '',
    );
    const controller = new ContactController(emailService);

    router.post('/', controller.sendEmail);

    return router;
  }
}
