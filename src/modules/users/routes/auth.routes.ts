import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { celebrate, Joi, Segments } from 'celebrate';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  authController.signUp
);

export default authRouter;
