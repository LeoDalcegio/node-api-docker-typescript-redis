import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { celebrate, Joi, Segments } from 'celebrate';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/signin',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.signIn,
);

export default authRouter;
