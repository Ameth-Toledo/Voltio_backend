import { IDirectionRepository } from '../domain/IDirectionRepository'
import { DirectionRequest } from '../domain/dto/DirectionRequest'
import { DirectionResponse } from '../domain/dto/DirectionResponse'

export class CreateDirectionUseCase {
    constructor(private directionRepository: IDirectionRepository) {}

    async execute(data: DirectionRequest): Promise<DirectionResponse> {
        if (!data.id_usuario || data.id_usuario <= 0) {
            throw new Error('El ID del usuario es obligatorio y debe ser válido')
        }

        if (!data.direccion || data.direccion.trim() === '') {
            throw new Error('La dirección es obligatoria')
        }

        const direction = await this.directionRepository.createDirection(data)
        return new DirectionResponse(direction)
    }
}