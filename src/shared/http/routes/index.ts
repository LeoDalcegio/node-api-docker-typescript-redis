import customersRouter from '@modules/customers/routes/customers.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';
import productsRouter from '@modules/products/routes/products.routes';
import authRouter from '@modules/users/routes/auth.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
