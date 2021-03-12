import { Request, Response } from "express";
import { CreateProductDto } from "../dto/CreateProductDto";
import { UpdateProductDto } from "../dto/UpdateProductDto";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductsService from "../services/ListProductsService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductsService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute(id);

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductDto: CreateProductDto = {
      name, price, quantity
    }

    const createProduct = new CreateProductService();

    const product = await createProduct.execute(createProductDto);

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductDto: UpdateProductDto = {
      name, price, quantity
    }

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute(id, updateProductDto);

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute(id);

    return response.json([]);
  }
}
