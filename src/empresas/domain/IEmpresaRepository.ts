import { Empresa } from './entities/Empresa';
import { EmpresaRequest, EmpresaUpdateRequest } from './dto/EmpresaRequest';

export interface IEmpresaRepository {
  createEmpresa(data: EmpresaRequest): Promise<Empresa>;
  getAllEmpresas(): Promise<Empresa[]>;
  getEmpresaById(id: number): Promise<Empresa | null>;
  getEmpresaByUsuarioId(id_usuario: number): Promise<Empresa | null>;
  updateEmpresa(id: number, data: EmpresaUpdateRequest): Promise<Empresa | null>;
  deleteEmpresa(id: number): Promise<boolean>;
}
