import { Request, Response } from 'express';
import { EmailService } from '../../services';

export class ContactController {
  constructor(public readonly emailService: EmailService) {}

  sendEmail = (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      this.emailService.sendContactEmail({ name, email, message });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Email failed' });
    }
  };
}
