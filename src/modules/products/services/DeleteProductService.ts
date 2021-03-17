import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import { PRODUCT_NOT_FOUND } from '@shared/errors/Errors';
import RedisCache from '@shared/providers/cache/RedisCache';
import { API_VENDAS_PRODUCT_LIST } from '@shared/constants/redis-keys';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError(PRODUCT_NOT_FOUND);
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate(API_VENDAS_PRODUCT_LIST);

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
