import nodemailer from 'nodemailer';
import { ISendMailOptions } from './interfaces/Mail';
import { HandlebarsMailTemplate } from './HandlebarsMailTemplate';

export default class EtherealMail {
  static async sendMail({ subject, to, templateData }: ISendMailOptions) {
    const account = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const mailTemplate = new HandlebarsMailTemplate();

    const message = await transporter.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      from: 'equipe@apivendas.com.br',
      html: await mailTemplate.parse(templateData),
    });

    console.log('message Id ' + message.id);
    console.log('url  ' + nodemailer.getTestMessageUrl(message));
  }
}
