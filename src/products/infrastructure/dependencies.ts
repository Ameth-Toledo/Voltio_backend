import { MySQLProductRepository } from './adapters/MySQLProductRepository';
import { CreateProductUseCase } from '../application/CreateProductUseCase';
import { GetAllProductsUseCase } from '../application/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../application/GetProductByIdUseCase';
import { UpdateProductUseCase } from '../application/UpdateProductUseCase';
import { DeleteProductUseCase } from '../application/DeleteProductUseCase';
import { GetProductsByCategoryUseCase } from '../application/GetProductsByCategoryUseCase';
import { CreateProductController } from './controllers/CreateProductController';
import { GetAllProductsController } from './controllers/GetAllProductsController';
import { GetProductByIdController } from './controllers/GetProductByIdController';
import { UpdateProductController } from './controllers/UpdateProductController';
import { DeleteProductController } from './controllers/DeleteProductController';
import { GetProductsByCategoryController } from './controllers/GetProductsByCategoryController';

const productRepository = new MySQLProductRepository();

const createProductUseCase = new CreateProductUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(productRepository);

export const createProductController = new CreateProductController(createProductUseCase);
export const getAllProductsController = new GetAllProductsController(getAllProductsUseCase);
export const getProductByIdController = new GetProductByIdController(getProductByIdUseCase);
export const updateProductController = new UpdateProductController(updateProductUseCase);
export const deleteProductController = new DeleteProductController(deleteProductUseCase);
export const getProductsByCategoryController = new GetProductsByCategoryController(getProductsByCategoryUseCase);
