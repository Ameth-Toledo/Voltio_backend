import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/CreateUserUseCase';
import { UserRequest } from '../../domain/dto/UserRequest';
import { toUserResponse } from '../../domain/dto/UserResponse';
import { uploadImageToCloudinary } from '../../../core/config/cloudinary_service';
import { IEmpresaRepository } from '../../../empresas/domain/IEmpresaRepository';

export class RegisterCompanyController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private empresaRepository: IEmpresaRepository
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const userRequest: UserRequest = req.body;
      const { nombre_comercial, direccion_empresa, telefono_contacto, correo_contacto } = req.body;

      if (!userRequest.name || !userRequest.lastname || !userRequest.email || !userRequest.password) {
        res.status(400).json({ error: 'Campos obligatorios: name, lastname, email, password' });
        return;
      }

      if (!nombre_comercial || !direccion_empresa || !telefono_contacto || !correo_contacto) {
        res.status(400).json({ error: 'Campos obligatorios de empresa: nombre_comercial, direccion_empresa, telefono_contacto, correo_contacto' });
        return;
      }

      userRequest.role = 'admin';
      userRequest.account_type = 'company';

      let logoUrl: string | undefined;
      if (req.file) {
        logoUrl = await uploadImageToCloudinary(req.file.buffer, 'companies');
        userRequest.image_profile = logoUrl;
      }

      const companyUser = await this.createUserUseCase.execute(userRequest);

      await this.empresaRepository.createEmpresa({
        id_usuario: companyUser.id,
        nombre_comercial,
        direccion: direccion_empresa,
        telefono_contacto,
        correo_contacto,
        logo_url: logoUrl,
      });

      const empresa = await this.empresaRepository.getEmpresaByUsuarioId(companyUser.id);

      res.status(201).json({
        message: 'Empresa creada exitosamente',
        user: toUserResponse(companyUser),
        empresa,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }
}