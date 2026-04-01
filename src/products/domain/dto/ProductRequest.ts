export interface ProductRequest {
  sku: string;
  nombre: string;
  descripcion?: string;
  precio_venta: number;
  stock_actual?: number;
  imagen_url?: string;
  id_categoria?: number;
  id_empresa?: number;
  especificaciones?: Array<{
    clave: string;
    valor: string;
  }>;
}

export interface ProductUpdateRequest {
  nombre?: string;
  descripcion?: string;
  precio_venta?: number;
  stock_actual?: number;
  imagen_url?: string;
  id_categoria?: number;
  id_empresa?: number;
  especificaciones?: Array<{
    clave: string;
    valor: string;
  }>;
}
