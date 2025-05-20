import { v4 as uuidv4 } from 'uuid';
import { Codigo, CodigoInput } from '../types';

// Como no hay base de datos los guardo en memoria
let codigos: Codigo[] = [
  {
    id: 'a1b2c3d4e5f6',
    data: 'Ejemplo de data',
    type: 'qr'
  },
  {
    id: 'g7h8i9j0k1l2',
    data: 'hola profe',
    type: 'qr'
  }
];

export const getAllCodigos = (): Codigo[] => {
  return codigos;
};

export const getCodigoById = (id: string): Codigo | undefined => {
  return codigos.find(codigo => codigo.id === id);
};

export const createCodigo = (codigoData: CodigoInput): Codigo => {
  const newCodigo: Codigo = {
    id: codigoData.id || uuidv4(),
    data: codigoData.data,
    type: codigoData.type || 'qr'
  };
  
  codigos.push(newCodigo);
  return newCodigo;
};

export const deleteCodigo = (id: string): boolean => {
  const initialLength = codigos.length;
  codigos = codigos.filter(codigo => codigo.id !== id);
  return codigos.length < initialLength;
};