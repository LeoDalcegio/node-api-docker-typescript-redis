import { API_VENDAS_PRODUCT_LIST } from '@shared/constants/redis-keys';
import RedisCache from '@shared/providers/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(API_VENDAS_PRODUCT_LIST);

    if (!products) {
      products = await productRepository.find();

      await redisCache.save(API_VENDAS_PRODUCT_LIST, products);
    }

    return products;
  }
}

export default ListProductsService;
