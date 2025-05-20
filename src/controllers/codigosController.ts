import { Request, Response } from 'express';
import * as codigosModel from '../models/codigosModel';
import { ErrorResponse } from '../types';


export const createCodigo = (req: Request, res: Response): void => {
  const { data, type } = req.body;

  if (!data) {
    res.status(400).json({ error: 'El campo "data" es obligatorio' } as ErrorResponse);
    return;
  }
  
  const newCodigo = codigosModel.createCodigo({ data, type });
  res.status(201).json(newCodigo);
};


export const deleteCodigo = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deleted = codigosModel.deleteCodigo(id);
  
  if (!deleted) {
    res.status(404).json({ error: 'Código no encontrado' } as ErrorResponse);
    return;
  }
  
  res.status(204).end();
};


export const getCodigos = (req: Request, res: Response): void => {
  const allCodigos = codigosModel.getAllCodigos();
  res.status(200).json(allCodigos);
};


export const getCodigoById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const codigo = codigosModel.getCodigoById(id);
  
  if (!codigo) {
    res.status(404).json({ error: 'Código no encontrado' } as ErrorResponse);
    return;
  }
  
  res.status(200).json(codigo);
};