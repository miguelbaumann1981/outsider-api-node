import { Resend } from 'resend';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export class EmailService {
  private mailerSender: string;
  private mailerEmail: string;
  private mailerApiKey: string;

  constructor(mailerSender: string, mailerEmail: string, mailerApiKey: string) {
    this.mailerSender = mailerSender;
    this.mailerEmail = mailerEmail;
    this.mailerApiKey = mailerApiKey;
  }

  async sendResendEmail(data: ContactMessage): Promise<boolean> {
    const resend = new Resend(this.mailerApiKey);
    const { name, email, message } = data;

    try {
      await resend.emails.send({
        from: this.mailerSender,
        to: this.mailerEmail,
        subject: `Nuevo mensaje de ${name}`,
        html: `<p style="font-size:18px">Administrador@,</p> 
                <p style="font-size:18px; margin-bottom: 20px"><strong style="color: #009689">${name}</strong> (${email}) ha mandado un mensaje:</p>
                <p style="font-size:18px">${message}</p>`,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
