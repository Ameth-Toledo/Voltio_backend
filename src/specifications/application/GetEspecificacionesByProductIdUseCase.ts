import { IEspecificacionRepository } from '../domain/IEspecificacionRepository';
import { EspecificacionResponse } from '../domain/dto/EspecificacionResponse';

export class GetEspecificacionesByProductIdUseCase {
  constructor(private especificacionRepository: IEspecificacionRepository) {}

  async execute(id_producto: number): Promise<EspecificacionResponse[]> {
    const especificaciones = await this.especificacionRepository.getEspecificacionesByProductId(id_producto);
    return especificaciones.map(esp => new EspecificacionResponse(esp));
  }
}
