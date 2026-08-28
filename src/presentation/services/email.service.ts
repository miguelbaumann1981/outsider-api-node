import nodemailer, { Transporter } from 'nodemailer';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_SECRET_KEY,
      },
    });
  }

  async sendContactEmail(data: ContactMessage): Promise<boolean> {
    const { name, email, message } = data;

    try {
      await this.transporter.sendMail({
        from: `"Formulario Web" <${process.env.MAILER_EMAIL}>`,
        replyTo: email,
        to: process.env.MAILER_EMAIL,
        subject: `${name} te escribe desde el formulario de la web`,
        html: `
          <h3>Este es un nuevo mensaje enviado desde la página web de Outsider</h3>
          <h3>Nombre: <strong>${name}</strong></h3>
          <h3>Correo electrónico: <strong>${email}</strong></h3>
          <h3>Mensaje:</h3>
          <h3><strong>${message}</strong></h3>
        `,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
