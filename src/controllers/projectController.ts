import { NextApiRequest, NextApiResponse } from 'next';
import Project from '../models/Project';
import dbConnect from '../lib/dbConnect';

// Helper para respuestas de error
const handleError = (res: NextApiResponse, error: any, status = 500) => {
  res.status(status).json({ 
    success: false, 
    error: error.message || 'Server Error' 
  });
};

// GET: Obtener todos los proyectos
export const getProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const projects = await Project.find({});
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    handleError(res, error);
  }
};

// POST: Crear nuevo proyecto
export const createProject = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    handleError(res, error, 400);
  }
};

// PUT: Actualizar proyecto
export const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { id } = req.query;
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }
    
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE: Eliminar proyecto
export const deleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { id } = req.query;
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    handleError(res, error);
  }
};

// GET : Obtener un proyecto por ID
export const getProjectById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, error: 'ID inválido' });
    }
    
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }
    
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    handleError(res, error);
  }
};