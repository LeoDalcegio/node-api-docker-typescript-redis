import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import { PRODUCT_NAME_CONFLICT, PRODUCT_NOT_FOUND } from "@shared/errors/Errors";
import { UpdateProductDto } from "../dto/UpdateProductDto";

class UpdateProductService {
  public async execute(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError(PRODUCT_NOT_FOUND);
    }

    const productNameExists = await productRepository.findByName(updateProductDto.name);

    if (productNameExists) {
      throw new AppError(PRODUCT_NAME_CONFLICT);
    }

    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.quantity = updateProductDto.quantity;

    await productRepository.save(product);

    return product
  }
}

export default UpdateProductService;
