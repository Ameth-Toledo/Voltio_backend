import { Categoria } from '../entities/Categoria';

export class CategoriaResponse {
  id_categoria: number;
  nombre_categoria: string;

  constructor(categoria: Categoria) {
    this.id_categoria = categoria.id_categoria;
    this.nombre_categoria = categoria.nombre_categoria;
  }
}
