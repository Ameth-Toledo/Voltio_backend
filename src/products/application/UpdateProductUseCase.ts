import { IProductRepository } from '../domain/IProductRepository';
import { ProductUpdateRequest } from '../domain/dto/ProductRequest';
import { ProductResponse } from '../domain/dto/ProductResponse';

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number, data: ProductUpdateRequest): Promise<ProductResponse | null> {
    const product = await this.productRepository.updateProduct(id, data);
    return product ? new ProductResponse(product) : null;
  }
}
