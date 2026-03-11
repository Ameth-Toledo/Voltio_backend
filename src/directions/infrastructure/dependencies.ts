import { MySQLDirectionRepository } from './adapters/MySQLDirectionRepository'
import { CreateDirectionUseCase } from '../application/CreateDirectionUseCase'
import { GetAllDirectionsUseCase } from '../application/GetAllDirectionsUseCase'
import { GetDirectionByIdUseCase } from '../application/GetDirectionByIdUseCase'
import { GetDirectionsByUserIdUseCase } from '../application/GetDirectionsByUserIdUseCase'
import { UpdateDirectionUseCase } from '../application/UpdateDirectionUseCase'
import { DeleteDirectionUseCase } from '../application/DeleteDirectionUseCase'
import { CreateDirectionController } from './controllers/CreateDirectionController'
import { GetAllDirectionController } from './controllers/GetAllDirectionController'
import { GetDirectionByIdController } from './controllers/GetDirectionByIdController'
import { GetDirectionsByUserIdController } from './controllers/GetDirectionsByUserIdController'
import { UpdateDirectionController } from './controllers/UpdateDirectionController'
import { DeleteDirectionController } from './controllers/DeleteDirectionController'

const directionRepository = new MySQLDirectionRepository()

export const createDirectionController = new CreateDirectionController(new CreateDirectionUseCase(directionRepository))
export const getAllDirectionController = new GetAllDirectionController(new GetAllDirectionsUseCase(directionRepository))
export const getDirectionByIdController = new GetDirectionByIdController(new GetDirectionByIdUseCase(directionRepository))
export const getDirectionsByUserIdController = new GetDirectionsByUserIdController(new GetDirectionsByUserIdUseCase(directionRepository))
export const updateDirectionController = new UpdateDirectionController(new UpdateDirectionUseCase(directionRepository))
export const deleteDirectionController = new DeleteDirectionController(new DeleteDirectionUseCase(directionRepository))