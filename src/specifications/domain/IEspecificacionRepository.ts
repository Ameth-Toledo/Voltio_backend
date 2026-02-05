import { Especificacion } from './entities/Especificacion';
import { EspecificacionRequest, EspecificacionUpdateRequest } from './dto/EspecificacionRequest';

export interface IEspecificacionRepository {
  createEspecificacion(data: EspecificacionRequest): Promise<Especificacion>;
  getAllEspecificaciones(): Promise<Especificacion[]>;
  getEspecificacionById(id: number): Promise<Especificacion | null>;
  getEspecificacionesByProductId(id_producto: number): Promise<Especificacion[]>;
  updateEspecificacion(id: number, data: EspecificacionUpdateRequest): Promise<Especificacion | null>;
  deleteEspecificacion(id: number): Promise<boolean>;
  deleteEspecificacionesByProductId(id_producto: number): Promise<boolean>;
}
