import { Product } from './entities/Product';
import { ProductRequest, ProductUpdateRequest } from './dto/ProductRequest';

export interface IProductRepository {
  createProduct(data: ProductRequest): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  updateProduct(id: number, data: ProductUpdateRequest): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
  getProductBySku(sku: string): Promise<Product | null>;
  getProductsByCategory(id_categoria: number): Promise<Product[]>;
}
