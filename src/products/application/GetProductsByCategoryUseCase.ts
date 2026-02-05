import { IProductRepository } from '../domain/IProductRepository';
import { ProductResponse } from '../domain/dto/ProductResponse';

export class GetProductsByCategoryUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id_categoria: number): Promise<ProductResponse[]> {
    const products = await this.productRepository.getProductsByCategory(id_categoria);
    return products.map(product => new ProductResponse(product));
  }
}
