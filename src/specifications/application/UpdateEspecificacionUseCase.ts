import { IEspecificacionRepository } from '../domain/IEspecificacionRepository';
import { EspecificacionUpdateRequest } from '../domain/dto/EspecificacionRequest';
import { EspecificacionResponse } from '../domain/dto/EspecificacionResponse';

export class UpdateEspecificacionUseCase {
  constructor(private especificacionRepository: IEspecificacionRepository) {}

  async execute(id: number, data: EspecificacionUpdateRequest): Promise<EspecificacionResponse | null> {
    if (data.clave && data.clave.trim() === '') {
      throw new Error('La clave no puede estar vacía');
    }

    if (data.valor && data.valor.trim() === '') {
      throw new Error('El valor no puede estar vacío');
    }

    const especificacion = await this.especificacionRepository.updateEspecificacion(id, {
      clave: data.clave?.trim(),
      valor: data.valor?.trim(),
    });

    return especificacion ? new EspecificacionResponse(especificacion) : null;
  }
}
