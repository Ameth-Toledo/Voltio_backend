import { IEmpresaRepository } from '../domain/IEmpresaRepository';
import { EmpresaRequest } from '../domain/dto/EmpresaRequest';
import { EmpresaResponse } from '../domain/dto/EmpresaResponse';

export class CreateEmpresaUseCase {
  constructor(private empresaRepository: IEmpresaRepository) {}

  async execute(data: EmpresaRequest): Promise<EmpresaResponse> {
    if (!data.id_usuario || data.id_usuario <= 0) {
      throw new Error('El ID del usuario es obligatorio y debe ser válido');
    }

    if (!data.nombre_comercial || data.nombre_comercial.trim() === '') {
      throw new Error('El nombre comercial es obligatorio');
    }

    if (!data.direccion || data.direccion.trim() === '') {
      throw new Error('La dirección es obligatoria');
    }

    if (!data.telefono_contacto || data.telefono_contacto.trim() === '') {
      throw new Error('El teléfono de contacto es obligatorio');
    }

    if (!data.correo_contacto || data.correo_contacto.trim() === '') {
      throw new Error('El correo de contacto es obligatorio');
    }

    const existing = await this.empresaRepository.getEmpresaByUsuarioId(data.id_usuario);
    if (existing) {
      throw new Error('Este usuario ya tiene una empresa registrada');
    }

    const empresa = await this.empresaRepository.createEmpresa(data);
    return new EmpresaResponse(empresa);
  }
}
