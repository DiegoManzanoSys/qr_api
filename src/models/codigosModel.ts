import { v4 as uuidv4 } from 'uuid';
import { Codigo, CodigoInput } from '../types';
import { getDbConnection } from '../database/db';

export const getAllCodigos = async (): Promise<Codigo[]> => {
  const db = await getDbConnection();
  return db.all<Codigo[]>('SELECT * FROM codigos');
};

export const getCodigoById = async (id: string): Promise<Codigo | undefined> => {
  const db = await getDbConnection();
  const codigo = await db.get<Codigo>('SELECT * FROM codigos WHERE id = ?', id);
  return codigo || undefined;
};

export const createCodigo = async (codigoData: CodigoInput): Promise<Codigo> => {
  const newCodigo: Codigo = {
    id: codigoData.id || uuidv4(),
    data: codigoData.data,
    type: codigoData.type || 'qr'
  };
  
  const db = await getDbConnection();
  await db.run(
    'INSERT INTO codigos (id, data, type) VALUES (?, ?, ?)',
    newCodigo.id, newCodigo.data, newCodigo.type
  );
  
  return newCodigo;
};

export const deleteCodigo = async (id: string): Promise<boolean> => {
  const db = await getDbConnection();
  const result = await db.run('DELETE FROM codigos WHERE id = ?', id);
  return (result.changes ?? 0) > 0;
};

export const deleteAllCodigos = async (): Promise<boolean> => {
  const db = await getDbConnection();
  const result = await db.run('DELETE FROM codigos');
  return (result.changes ?? 0) >= 0;
};