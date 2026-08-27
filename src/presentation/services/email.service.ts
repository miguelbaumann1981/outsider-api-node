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
      const sentInformation = await this.transporter.sendMail({
        from: `"Formulario Web" <${process.env.MAILER_EMAIL}>`,
        replyTo: email,
        to: process.env.MAILER_EMAIL,
        subject: `Nuevo mensaje de ${name}`,
        html: `
          <h2>Nuevo mensaje desde la web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });
      console.log(sentInformation);
      return true;
    } catch (error) {
      return false;
    }
  }
}
