import { IDirectionRepository } from '../domain/IDirectionRepository'
import { DirectionUpdateRequest } from '../domain/dto/DirectionRequest'
import { DirectionResponse } from '../domain/dto/DirectionResponse'

export class UpdateDirectionUseCase {
    constructor(private directionRepository: IDirectionRepository) {}

    async execute(id: number, data: DirectionUpdateRequest): Promise<DirectionResponse> {
        const direction = await this.directionRepository.updateDirection(id, data)
        if (!direction) throw new Error('Dirección no encontrada')
        return new DirectionResponse(direction)
    }
}