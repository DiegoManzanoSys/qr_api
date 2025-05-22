import { Request, Response } from 'express';
import * as codigosModel from '../models/codigosModel';
import { ErrorResponse } from '../types';

export const createCodigo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, type } = req.body;

    if (!data) {
      res.status(400).json({ error: 'El campo "data" es obligatorio' } as ErrorResponse);
      return;
    }
    
    const newCodigo = await codigosModel.createCodigo({ data, type });
    res.status(201).json(newCodigo);
  } catch (error) {
    console.error('Error al crear código:', error);
    res.status(500).json({ error: 'Error al crear el código' } as ErrorResponse);
  }
};

export const deleteCodigo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await codigosModel.deleteCodigo(id);
    
    if (!deleted) {
      res.status(404).json({ error: 'Código no encontrado' } as ErrorResponse);
      return;
    }
    
    res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar código:', error);
    res.status(500).json({ error: 'Error al eliminar el código' } as ErrorResponse);
  }
};

export const getCodigos = async (req: Request, res: Response): Promise<void> => {
  try {
    const allCodigos = await codigosModel.getAllCodigos();
    res.status(200).json(allCodigos);
  } catch (error) {
    console.error('Error al obtener códigos:', error);
    res.status(500).json({ error: 'Error al obtener los códigos' } as ErrorResponse);
  }
};

export const getCodigoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const codigo = await codigosModel.getCodigoById(id);
    
    if (!codigo) {
      res.status(404).json({ error: 'Código no encontrado' } as ErrorResponse);
      return;
    }
    
    res.status(200).json(codigo);
  } catch (error) {
    console.error('Error al obtener código:', error);
    res.status(500).json({ error: 'Error al obtener el código' } as ErrorResponse);
  }
};

export const deleteAllCodigos = async (req: Request, res: Response): Promise<void> => {
  try {
    await codigosModel.deleteAllCodigos();
    res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar todos los códigos:', error);
    res.status(500).json({ error: 'Error al eliminar todos los códigos' } as ErrorResponse);
  }
};