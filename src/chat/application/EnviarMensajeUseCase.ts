import { IChatRepository } from '../domain/IChatRepository';
import { EnviarMensajeRequest } from '../domain/dto/ChatRequest';
import { MensajeResponse } from '../domain/dto/ChatResponse';

export class EnviarMensajeUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(data: EnviarMensajeRequest): Promise<MensajeResponse> {
    if (!data.id_conversacion || data.id_conversacion <= 0) {
      throw new Error('El ID de conversación es obligatorio');
    }
    if (!data.id_remitente || data.id_remitente <= 0) {
      throw new Error('El ID del remitente es obligatorio');
    }

    const tipo = data.tipo_mensaje || 'texto';

    if (tipo === 'texto' && !data.contenido?.trim()) {
      throw new Error('El contenido del mensaje no puede estar vacío');
    }
    if (tipo !== 'texto' && !data.archivo_url) {
      throw new Error('La URL del archivo es obligatoria para mensajes multimedia');
    }

    const mensaje = await this.chatRepository.enviarMensaje({
      ...data,
      tipo_mensaje: tipo,
    });
    return new MensajeResponse(mensaje);
  }
}
