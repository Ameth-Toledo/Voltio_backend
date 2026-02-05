import { IEspecificacionRepository } from '../domain/IEspecificacionRepository';
import { EspecificacionResponse } from '../domain/dto/EspecificacionResponse';

export class GetAllEspecificacionesUseCase {
  constructor(private especificacionRepository: IEspecificacionRepository) {}

  async execute(): Promise<EspecificacionResponse[]> {
    const especificaciones = await this.especificacionRepository.getAllEspecificaciones();
    return especificaciones.map(esp => new EspecificacionResponse(esp));
  }
}
