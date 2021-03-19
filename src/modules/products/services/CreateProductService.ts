import { API_VENDAS_PRODUCT_LIST } from '@shared/constants/redis-keys';
import AppError from '@shared/errors/AppError';
import { PRODUCT_NAME_CONFLICT } from '@shared/errors/Errors';
import redisCache from '@shared/providers/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import { CreateProductDto } from '../dto/CreateProductDto';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

class CreateProductService {
  public async execute(createProductDto: CreateProductDto): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(
      createProductDto.name,
    );

    if (productExists) {
      throw new AppError(PRODUCT_NAME_CONFLICT);
    }

    const product = productRepository.create({
      name: createProductDto.name,
      price: createProductDto.price,
      quantity: createProductDto.quantity,
    });

    await redisCache.invalidate(API_VENDAS_PRODUCT_LIST);

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
