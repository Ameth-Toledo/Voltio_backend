import { IDirectionRepository } from '../domain/IDirectionRepository'
import { DirectionResponse } from '../domain/dto/DirectionResponse'

export class GetAllDirectionsUseCase {
    constructor(private directionRepository: IDirectionRepository) {}

    async execute(): Promise<DirectionResponse[]> {
        const directions = await this.directionRepository.getAllDirections()
        return directions.map(d => new DirectionResponse(d))
    }
}