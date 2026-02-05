import { MySQLEspecificacionRepository } from './adapters/MySQLEspecificacionRepository';
import { CreateEspecificacionUseCase } from '../application/CreateEspecificacionUseCase';
import { GetAllEspecificacionesUseCase } from '../application/GetAllEspecificacionesUseCase';
import { GetEspecificacionByIdUseCase } from '../application/GetEspecificacionByIdUseCase';
import { GetEspecificacionesByProductIdUseCase } from '../application/GetEspecificacionesByProductIdUseCase';
import { UpdateEspecificacionUseCase } from '../application/UpdateEspecificacionUseCase';
import { DeleteEspecificacionUseCase } from '../application/DeleteEspecificacionUseCase';
import { CreateEspecificacionController } from './controllers/CreateEspecificacionController';
import { GetAllEspecificacionesController } from './controllers/GetAllEspecificacionesController';
import { GetEspecificacionByIdController } from './controllers/GetEspecificacionByIdController';
import { GetEspecificacionesByProductIdController } from './controllers/GetEspecificacionesByProductIdController';
import { UpdateEspecificacionController } from './controllers/UpdateEspecificacionController';
import { DeleteEspecificacionController } from './controllers/DeleteEspecificacionController';

const especificacionRepository = new MySQLEspecificacionRepository();

const createEspecificacionUseCase = new CreateEspecificacionUseCase(especificacionRepository);
const getAllEspecificacionesUseCase = new GetAllEspecificacionesUseCase(especificacionRepository);
const getEspecificacionByIdUseCase = new GetEspecificacionByIdUseCase(especificacionRepository);
const getEspecificacionesByProductIdUseCase = new GetEspecificacionesByProductIdUseCase(especificacionRepository);
const updateEspecificacionUseCase = new UpdateEspecificacionUseCase(especificacionRepository);
const deleteEspecificacionUseCase = new DeleteEspecificacionUseCase(especificacionRepository);

export const createEspecificacionController = new CreateEspecificacionController(createEspecificacionUseCase);
export const getAllEspecificacionesController = new GetAllEspecificacionesController(getAllEspecificacionesUseCase);
export const getEspecificacionByIdController = new GetEspecificacionByIdController(getEspecificacionByIdUseCase);
export const getEspecificacionesByProductIdController = new GetEspecificacionesByProductIdController(getEspecificacionesByProductIdUseCase);
export const updateEspecificacionController = new UpdateEspecificacionController(updateEspecificacionUseCase);
export const deleteEspecificacionController = new DeleteEspecificacionController(deleteEspecificacionUseCase);
