import { IDirectionRepository } from '../domain/IDirectionRepository'
import { DirectionResponse } from '../domain/dto/DirectionResponse'

export class GetDirectionsByUserIdUseCase {
    constructor(private directionRepository: IDirectionRepository) {}

    async execute(id_usuario: number): Promise<DirectionResponse[]> {
        const directions = await this.directionRepository.getDirectionsByUserId(id_usuario)
        return directions.map(d => new DirectionResponse(d))
    }
}