import AppError from '@shared/errors/AppError';
import { USER_NOT_FOUND } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import { ForgotPasswordDto } from '../dto/ForgotPasswordDto';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import EtherealMail from '@shared/providers/mail/EtherealMail';
import path from 'path';

class SendForgotPasswordEmailService {
  public async execute(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(forgotPasswordDto.email);

    if (!user) {
      throw new AppError(USER_NOT_FOUND);
    }

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: { email: user.email, name: user.name },
      subject: 'Redefinição de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
