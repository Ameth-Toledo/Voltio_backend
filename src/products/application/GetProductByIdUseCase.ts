import { IProductRepository } from '../domain/IProductRepository';
import { ProductResponse } from '../domain/dto/ProductResponse';

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number): Promise<ProductResponse | null> {
    const product = await this.productRepository.getProductById(id);
    return product ? new ProductResponse(product) : null;
  }
}
