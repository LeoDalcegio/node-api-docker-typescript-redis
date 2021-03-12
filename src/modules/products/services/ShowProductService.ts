import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import { PRODUCT_NOT_FOUND } from "@shared/errors/Errors";

class ShowProductService {
  public async execute(id: string): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError(PRODUCT_NOT_FOUND);
    }

    return product
  }
}

export default ShowProductService;
