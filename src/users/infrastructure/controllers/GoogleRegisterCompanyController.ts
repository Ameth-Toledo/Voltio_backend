import { Request, Response } from 'express';
import { AuthService } from '../../application/AuthService';
import { GoogleLoginRequest } from '../../domain/dto/UserRequest';
import { LoginResponse, toUserResponse } from '../../domain/dto/UserResponse';
import { generateJWT, generateRefreshToken, setAuthCookie, setRefreshCookie } from '../../../core/security/auth';
import { IEmpresaRepository } from '../../../empresas/domain/IEmpresaRepository';

export class GoogleRegisterCompanyController {
  constructor(
    private authService: AuthService,
    private empresaRepository: IEmpresaRepository
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { idToken, firebase_token, nombre_comercial, direccion_empresa, telefono_contacto, correo_contacto } = req.body;

      if (!idToken) {
        res.status(400).json({ error: 'idToken es requerido' });
        return;
      }

      if (!nombre_comercial || !direccion_empresa || !telefono_contacto || !correo_contacto) {
        res.status(400).json({ error: 'Campos obligatorios de empresa: nombre_comercial, direccion_empresa, telefono_contacto, correo_contacto' });
        return;
      }

      const googleRequest: GoogleLoginRequest = {
        idToken,
        accountType: 'company',
        firebase_token,
      };

      const user = await this.authService.googleLogin(googleRequest);

      const existingEmpresa = await this.empresaRepository.getEmpresaByUsuarioId(user.id);
      if (existingEmpresa) {
        res.status(400).json({ error: 'Este usuario ya tiene una empresa registrada' });
        return;
      }

      await this.empresaRepository.createEmpresa({
        id_usuario: user.id,
        nombre_comercial,
        direccion: direccion_empresa,
        telefono_contacto,
        correo_contacto,
        logo_url: user.image_profile || undefined,
      });

      const empresa = await this.empresaRepository.getEmpresaByUsuarioId(user.id);

      const accessToken = generateJWT(user.id, user.email, user.role);
      const refreshToken = generateRefreshToken(user.id);

      setAuthCookie(res, accessToken);
      setRefreshCookie(res, refreshToken);

      const response: LoginResponse = {
        message: 'Empresa creada con Google exitosamente',
        accessToken,
        refreshToken,
        user: toUserResponse(user),
      };

      res.status(201).json({ ...response, empresa });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }
}
