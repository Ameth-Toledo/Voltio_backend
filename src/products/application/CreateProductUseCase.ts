import { IProductRepository } from '../domain/IProductRepository';
import { ProductRequest } from '../domain/dto/ProductRequest';
import { ProductResponse } from '../domain/dto/ProductResponse';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: ProductRequest): Promise<ProductResponse> {
    const product = await this.productRepository.createProduct(data);
    return new ProductResponse(product);
  }
}
