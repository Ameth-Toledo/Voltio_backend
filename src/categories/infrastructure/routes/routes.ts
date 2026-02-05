import { Router, Request, Response } from 'express';
import { CreateCategoriaController } from '../controllers/CreateCategoriaController';
import { GetAllCategoriasController } from '../controllers/GetAllCategoriasController';
import { GetCategoriaByIdController } from '../controllers/GetCategoriaByIdController';
import { UpdateCategoriaController } from '../controllers/UpdateCategoriaController';
import { DeleteCategoriaController } from '../controllers/DeleteCategoriaController';
import { jwtMiddleware } from '../../../core/security/jwt_middleware';

export function configureCategoriasRoutes(
  createCategoriaCtrl: CreateCategoriaController,
  getAllCategoriasCtrl: GetAllCategoriasController,
  getCategoriaByIdCtrl: GetCategoriaByIdController,
  updateCategoriaCtrl: UpdateCategoriaController,
  deleteCategoriaCtrl: DeleteCategoriaController
): Router {
  const router = Router();

  router.get('/categorias', (req: Request, res: Response) => getAllCategoriasCtrl.handle(req, res));
  router.get('/categorias/:id', (req: Request, res: Response) => getCategoriaByIdCtrl.handle(req, res));

  router.post('/categorias', jwtMiddleware, (req: Request, res: Response) =>
    createCategoriaCtrl.handle(req, res)
  );
  router.put('/categorias/:id', jwtMiddleware, (req: Request, res: Response) =>
    updateCategoriaCtrl.handle(req, res)
  );
  router.delete('/categorias/:id', jwtMiddleware, (req: Request, res: Response) =>
    deleteCategoriaCtrl.handle(req, res)
  );

  return router;
}
