import { IEspecificacionRepository } from '../domain/IEspecificacionRepository';
import { EspecificacionResponse } from '../domain/dto/EspecificacionResponse';

export class GetEspecificacionByIdUseCase {
  constructor(private especificacionRepository: IEspecificacionRepository) {}

  async execute(id: number): Promise<EspecificacionResponse | null> {
    const especificacion = await this.especificacionRepository.getEspecificacionById(id);
    return especificacion ? new EspecificacionResponse(especificacion) : null;
  }
}
