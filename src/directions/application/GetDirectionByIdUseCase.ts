import { IDirectionRepository } from '../domain/IDirectionRepository'
import { DirectionResponse } from '../domain/dto/DirectionResponse'

export class GetDirectionByIdUseCase {
    constructor(private directionRepository: IDirectionRepository) {}

    async execute(id: number): Promise<DirectionResponse> {
        const direction = await this.directionRepository.getDirectionById(id)
        if (!direction) throw new Error('Dirección no encontrada')
        return new DirectionResponse(direction)
    }
}