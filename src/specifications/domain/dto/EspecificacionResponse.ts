import { Especificacion } from '../entities/Especificacion';

export class EspecificacionResponse {
  id_especificacion: number;
  id_producto: number;
  clave: string;
  valor: string;

  constructor(especificacion: Especificacion) {
    this.id_especificacion = especificacion.id_especificacion;
    this.id_producto = especificacion.id_producto;
    this.clave = especificacion.clave;
    this.valor = especificacion.valor;
  }
}
