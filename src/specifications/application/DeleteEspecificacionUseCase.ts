import { IEspecificacionRepository } from '../domain/IEspecificacionRepository';

export class DeleteEspecificacionUseCase {
  constructor(private especificacionRepository: IEspecificacionRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.especificacionRepository.deleteEspecificacion(id);
  }
}
