import express from 'express';
import * as codigosController from '../controllers/codigosController';

const router = express.Router();

router.get('/', codigosController.getCodigos);
router.get('/:id', codigosController.getCodigoById);
router.post('/', codigosController.createCodigo);
router.delete('/:id', codigosController.deleteCodigo);
router.delete('/', codigosController.deleteAllCodigos);

export default router;