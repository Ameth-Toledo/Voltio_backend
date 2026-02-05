import { Categoria } from './entities/Categoria';
import { CategoriaRequest, CategoriaUpdateRequest } from './dto/CategoriaRequest';

export interface ICategoriaRepository {
  createCategoria(data: CategoriaRequest): Promise<Categoria>;
  getAllCategorias(): Promise<Categoria[]>;
  getCategoriaById(id: number): Promise<Categoria | null>;
  updateCategoria(id: number, data: CategoriaUpdateRequest): Promise<Categoria | null>;
  deleteCategoria(id: number): Promise<boolean>;
  getCategoriaByName(nombre: string): Promise<Categoria | null>;
}
