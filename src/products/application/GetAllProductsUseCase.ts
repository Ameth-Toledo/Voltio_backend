import { IProductRepository } from '../domain/IProductRepository';
import { ProductResponse } from '../domain/dto/ProductResponse';

export class GetAllProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<ProductResponse[]> {
    const products = await this.productRepository.getAllProducts();
    return products.map(product => new ProductResponse(product));
  }
}
