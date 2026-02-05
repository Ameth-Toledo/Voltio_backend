export interface EspecificacionRequest {
  id_producto: number;
  clave: string;
  valor: string;
}

export interface EspecificacionUpdateRequest {
  clave?: string;
  valor?: string;
}
