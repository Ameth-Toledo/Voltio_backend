import { Direction } from './entities/Direction'
import { DirectionRequest, DirectionUpdateRequest } from './dto/DirectionRequest'

export interface IDirectionRepository {
    createDirection(data: DirectionRequest): Promise<Direction>
    getAllDirections(): Promise<Direction[]>
    getDirectionById(id: number): Promise<Direction | null>
    getDirectionsByUserId(id_usuario: number): Promise<Direction[]>
    updateDirection(id: number, data: DirectionUpdateRequest): Promise<Direction | null>
    deleteDirection(id: number): Promise<boolean>
}