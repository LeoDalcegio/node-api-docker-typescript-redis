import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import { PRODUCT_NOT_FOUND } from "@shared/errors/Errors";

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError(PRODUCT_NOT_FOUND);
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
