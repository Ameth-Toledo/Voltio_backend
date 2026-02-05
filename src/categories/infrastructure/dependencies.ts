import { MySQLCategoriaRepository } from './adapters/MySQLCategoriaRepository';
import { CreateCategoriaUseCase } from '../application/CreateCategoriaUseCase';
import { GetAllCategoriasUseCase } from '../application/GetAllCategoriasUseCase';
import { GetCategoriaByIdUseCase } from '../application/GetCategoriaByIdUseCase';
import { UpdateCategoriaUseCase } from '../application/UpdateCategoriaUseCase';
import { DeleteCategoriaUseCase } from '../application/DeleteCategoriaUseCase';
import { CreateCategoriaController } from './controllers/CreateCategoriaController';
import { GetAllCategoriasController } from './controllers/GetAllCategoriasController';
import { GetCategoriaByIdController } from './controllers/GetCategoriaByIdController';
import { UpdateCategoriaController } from './controllers/UpdateCategoriaController';
import { DeleteCategoriaController } from './controllers/DeleteCategoriaController';

const categoriaRepository = new MySQLCategoriaRepository();

const createCategoriaUseCase = new CreateCategoriaUseCase(categoriaRepository);
const getAllCategoriasUseCase = new GetAllCategoriasUseCase(categoriaRepository);
const getCategoriaByIdUseCase = new GetCategoriaByIdUseCase(categoriaRepository);
const updateCategoriaUseCase = new UpdateCategoriaUseCase(categoriaRepository);
const deleteCategoriaUseCase = new DeleteCategoriaUseCase(categoriaRepository);

export const createCategoriaController = new CreateCategoriaController(createCategoriaUseCase);
export const getAllCategoriasController = new GetAllCategoriasController(getAllCategoriasUseCase);
export const getCategoriaByIdController = new GetCategoriaByIdController(getCategoriaByIdUseCase);
export const updateCategoriaController = new UpdateCategoriaController(updateCategoriaUseCase);
export const deleteCategoriaController = new DeleteCategoriaController(deleteCategoriaUseCase);
