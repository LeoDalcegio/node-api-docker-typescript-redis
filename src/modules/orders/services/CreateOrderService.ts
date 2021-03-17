import CustomerRepository from '@modules/customers/typeorm/repositories/CustomerRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductRepository';
import AppError from '@shared/errors/AppError';
import {
  CUSTOMER_NOT_FOUND,
  PRODUCTS_WITH_IDS_NOT_FOUND,
  QUANTITY_NOT_AVALIABLE,
} from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import { CreateOrderDto } from '../dto/CreateOrderDto';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrderRepository';

class CreateOrderService {
  public async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, products } = createOrderDto;

    const orderRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const existentCustomer = await customerRepository.findOne(customerId);

    if (!existentCustomer) {
      throw new AppError(CUSTOMER_NOT_FOUND);
    }

    const productsFound = await productRepository.findByIds(products);

    if (!productsFound.length) {
      throw new AppError(PRODUCTS_WITH_IDS_NOT_FOUND);
    }

    const productsIds = productsFound.map(product => product.id);

    const inexistentProducts = products.filter(
      product => !productsIds.includes(product.id),
    );

    if (inexistentProducts.length) {
      throw new AppError(
        `${PRODUCTS_WITH_IDS_NOT_FOUND}. ID "${inexistentProducts[0].id}"`,
      );
    }

    const quantityAvaliable = products.filter(
      product =>
        productsFound.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvaliable.length) {
      throw new AppError(
        `${QUANTITY_NOT_AVALIABLE}. PRODUCT ID "${quantityAvaliable[0].id}". QUANTITY "${quantityAvaliable[0].quantity}"`,
      );
    }

    const serializedProducts = products.map(product => ({
      id: product.id,
      quantity: product.quantity,
      price: productsFound.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customerId: existentCustomer.id,
      customer: existentCustomer,
      products: serializedProducts,
    });

    const { orderProducts } = order;

    const updatedProductQuantity = orderProducts.map(product => ({
      id: product.productId,
      quantity:
        productsFound.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
