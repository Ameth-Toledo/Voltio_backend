import { IProductRepository } from '../domain/IProductRepository';
import { ProductResponse } from '../domain/dto/ProductResponse';

export class GetProductsByEmpresaUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id_empresa: number): Promise<ProductResponse[]> {
    const products = await this.productRepository.getProductsByEmpresa(id_empresa);
    return products.map(product => new ProductResponse(product));
  }
}
