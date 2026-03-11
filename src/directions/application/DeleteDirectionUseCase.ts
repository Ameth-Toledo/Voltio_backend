import { IDirectionRepository } from '../domain/IDirectionRepository'

export class DeleteDirectionUseCase {
    constructor(private directionRepository: IDirectionRepository) {}

    async execute(id: number): Promise<void> {
        const deleted = await this.directionRepository.deleteDirection(id)
        if (!deleted) throw new Error('Dirección no encontrada')
    }
}