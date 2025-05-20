import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import codigosRoutes from './routes/codigosRoutes';
import { ErrorResponse } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const contentType = req.headers['content-type'];
  const acceptHeader = req.headers['accept'];
  
  if ((req.path.startsWith('/codigos') && (req.method === 'POST' || req.method === 'PUT'))) {
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({ 
        error: 'Tipo de contenido no soportado',
        message: 'El Content-Type debe ser application/json;encoding=utf-8'
      } as ErrorResponse);
    }
  }
  
  if (req.path.startsWith('/codigos')) {
    if (!acceptHeader || !acceptHeader.includes('application/json')) {
      return res.status(406).json({ 
        error: 'No Aceptable',
        message: 'El encabezado Accept debe incluir application/json'
      } as ErrorResponse);
    }
  }
  
  next();
});

app.use('/codigos', codigosRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API de Escáner de Códigos QR',
    endpoints: [
      'GET /codigos',
      'GET /codigos/{id}',
      'POST /codigos',
      'DELETE /codigos/{id}'
    ]
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' } as ErrorResponse);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  } as ErrorResponse);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;