import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import codigosRoutes from './routes/codigosRoutes';
import { ErrorResponse } from './types';
import { initializeDatabase } from './database/db';

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar la base de datos al arrancar
(async () => {
  try {
    await initializeDatabase();
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
})();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const contentType = req.headers['content-type'];
  const acceptHeader = req.headers['accept'];
  
  // Para POST y PUT, el Content-Type debe ser application/json (con o sin encoding=utf-8)
  if ((req.path.startsWith('/codigos') && (req.method === 'POST' || req.method === 'PUT'))) {
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({ 
        error: 'Tipo de contenido no soportado',
        message: 'El Content-Type debe ser application/json;encoding=utf-8'
      } as ErrorResponse);
    }
  }
  
  // Para todas las rutas /codigos, acepta peticiones si tienen al menos uno de los dos headers
  if (req.path.startsWith('/codigos')) {
    const hasValidContentType = contentType && contentType.includes('application/json');
    const hasValidAccept = acceptHeader && acceptHeader.includes('application/json');
    
    if (!hasValidContentType && !hasValidAccept) {
      return res.status(406).json({ 
        error: 'No Aceptable',
        message: 'La petición debe incluir al menos uno de estos encabezados: Accept: application/json o Content-Type: application/json;encoding=utf-8'
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