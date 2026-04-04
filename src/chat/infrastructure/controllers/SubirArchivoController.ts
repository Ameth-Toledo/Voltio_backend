import { Request, Response } from 'express';
import { SubirArchivoChatUseCase } from '../../application/SubirArchivoChatUseCase';
import { Server } from 'socket.io';

export class SubirArchivoController {
  constructor(
    private subirArchivoUseCase: SubirArchivoChatUseCase,
    private io: Server
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id_conversacion = parseInt(String(req.params.id_conversacion));
      const id_remitente = parseInt(String(req.body.id_remitente));

      if (!req.file) {
        res.status(400).json({ error: 'No se recibió ningún archivo' });
        return;
      }

      const caption = req.body.caption?.trim() || undefined;

      const mensaje = await this.subirArchivoUseCase.execute(
        id_conversacion,
        id_remitente,
        req.file.buffer,
        req.file.mimetype,
        caption
      );

      this.io.to(`conversation_${id_conversacion}`).emit('new_message', mensaje);

      res.status(201).json(mensaje);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
