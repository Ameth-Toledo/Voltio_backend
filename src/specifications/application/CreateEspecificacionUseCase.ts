import { IEspecificacionRepository } from '../domain/IEspecificacionRepository';
import { EspecificacionRequest } from '../domain/dto/EspecificacionRequest';
import { EspecificacionResponse } from '../domain/dto/EspecificacionResponse';

export class CreateEspecificacionUseCase {
  constructor(private especificacionRepository: IEspecificacionRepository) {}

  async execute(data: EspecificacionRequest): Promise<EspecificacionResponse> {
    if (!data.clave || data.clave.trim() === '') {
      throw new Error('La clave de la especificación es obligatoria');
    }

    if (!data.valor || data.valor.trim() === '') {
      throw new Error('El valor de la especificación es obligatorio');
    }

    if (!data.id_producto || data.id_producto <= 0) {
      throw new Error('El ID del producto es obligatorio');
    }

    const especificacion = await this.especificacionRepository.createEspecificacion({
      id_producto: data.id_producto,
      clave: data.clave.trim(),
      valor: data.valor.trim(),
    });

    return new EspecificacionResponse(especificacion);
  }
}
