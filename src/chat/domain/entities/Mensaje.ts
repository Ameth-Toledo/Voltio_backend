export interface Mensaje {
  id_mensaje: number;
  id_conversacion: number;
  id_remitente: number;
  nombre_remitente?: string;
  contenido: string | null;
  tipo_mensaje: 'texto' | 'imagen' | 'video' | 'archivo';
  archivo_url: string | null;
  leido: boolean;
  created_at: Date;
}
