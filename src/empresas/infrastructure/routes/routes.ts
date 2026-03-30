import { Router, Request, Response } from 'express';
import { CreateEmpresaController } from '../controllers/CreateEmpresaController';
import { GetAllEmpresasController } from '../controllers/GetAllEmpresasController';
import { GetEmpresaByIdController } from '../controllers/GetEmpresaByIdController';
import { GetEmpresaByUsuarioIdController } from '../controllers/GetEmpresaByUsuarioIdController';
import { UpdateEmpresaController } from '../controllers/UpdateEmpresaController';
import { DeleteEmpresaController } from '../controllers/DeleteEmpresaController';
import { jwtMiddleware } from '../../../core/security/jwt_middleware';
import { upload } from '../../../core/config/multer_config';

export function configureEmpresasRoutes(
  createCtrl: CreateEmpresaController,
  getAllCtrl: GetAllEmpresasController,
  getByIdCtrl: GetEmpresaByIdController,
  getByUsuarioIdCtrl: GetEmpresaByUsuarioIdController,
  updateCtrl: UpdateEmpresaController,
  deleteCtrl: DeleteEmpresaController
): Router {
  const router = Router();

  router.get('/empresas', jwtMiddleware, (req: Request, res: Response) => getAllCtrl.handle(req, res));
  router.get('/empresas/:id', jwtMiddleware, (req: Request, res: Response) => getByIdCtrl.handle(req, res));
  router.get('/usuarios/:id_usuario/empresa', jwtMiddleware, (req: Request, res: Response) => getByUsuarioIdCtrl.handle(req, res));
  router.post('/empresas', jwtMiddleware, upload.single('logo'), (req: Request, res: Response) => createCtrl.handle(req, res));
  router.put('/empresas/:id', jwtMiddleware, upload.single('logo'), (req: Request, res: Response) => updateCtrl.handle(req, res));
  router.delete('/empresas/:id', jwtMiddleware, (req: Request, res: Response) => deleteCtrl.handle(req, res));

  return router;
}
