import { Router, Request, Response } from 'express';
import { CreateEspecificacionController } from '../controllers/CreateEspecificacionController';
import { GetAllEspecificacionesController } from '../controllers/GetAllEspecificacionesController';
import { GetEspecificacionByIdController } from '../controllers/GetEspecificacionByIdController';
import { GetEspecificacionesByProductIdController } from '../controllers/GetEspecificacionesByProductIdController';
import { UpdateEspecificacionController } from '../controllers/UpdateEspecificacionController';
import { DeleteEspecificacionController } from '../controllers/DeleteEspecificacionController';
import { jwtMiddleware } from '../../../core/security/jwt_middleware';

export function configureEspecificacionesRoutes(
  createEspecificacionCtrl: CreateEspecificacionController,
  getAllEspecificacionesCtrl: GetAllEspecificacionesController,
  getEspecificacionByIdCtrl: GetEspecificacionByIdController,
  getEspecificacionesByProductIdCtrl: GetEspecificacionesByProductIdController,
  updateEspecificacionCtrl: UpdateEspecificacionController,
  deleteEspecificacionCtrl: DeleteEspecificacionController
): Router {
  const router = Router();

  router.get('/especificaciones', (req: Request, res: Response) => getAllEspecificacionesCtrl.handle(req, res));
  router.get('/especificaciones/:id', (req: Request, res: Response) => getEspecificacionByIdCtrl.handle(req, res));
  router.get('/productos/:id_producto/especificaciones', (req: Request, res: Response) =>
    getEspecificacionesByProductIdCtrl.handle(req, res)
  );

  router.post('/especificaciones', jwtMiddleware, (req: Request, res: Response) =>
    createEspecificacionCtrl.handle(req, res)
  );
  router.put('/especificaciones/:id', jwtMiddleware, (req: Request, res: Response) =>
    updateEspecificacionCtrl.handle(req, res)
  );
  router.delete('/especificaciones/:id', jwtMiddleware, (req: Request, res: Response) =>
    deleteEspecificacionCtrl.handle(req, res)
  );

  return router;
}
