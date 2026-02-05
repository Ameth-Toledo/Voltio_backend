import { IProductRepository } from '../domain/IProductRepository';

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.productRepository.deleteProduct(id);
  }
}
