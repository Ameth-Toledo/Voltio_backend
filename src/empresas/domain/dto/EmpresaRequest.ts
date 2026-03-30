export interface EmpresaRequest {
  id_usuario: number;
  nombre_comercial: string;
  direccion: string;
  telefono_contacto: string;
  correo_contacto: string;
  logo_url?: string;
}

export interface EmpresaUpdateRequest {
  nombre_comercial?: string;
  direccion?: string;
  telefono_contacto?: string;
  correo_contacto?: string;
  logo_url?: string;
}
