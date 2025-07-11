import { NextApiRequest, NextApiResponse } from 'next';
import Project from '../models/Project';
import dbConnect from '../lib/dbConnect';

const handleError = (res: NextApiResponse, error: unknown, status = 500) => {
  const message = error instanceof Error ? error.message : 'Server Error';
  res.status(status).json({ success: false, error: message });
};

// GET
export const getProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const projects = await Project.find({});
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    handleError(res, error);
  }
};

// POST 
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

// PUT
export const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { id } = req.query;

    if (typeof id !== 'string') {
      return res.status(400).json({ success: false, error: 'ID inválido' });
    }

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE 
export const deleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { id } = req.query;

    if (typeof id !== 'string') {
      return res.status(400).json({ success: false, error: 'ID inválido' });
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    handleError(res, error);
  }
};

// GET ID
export const getProjectById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { id } = req.query;

    if (typeof id !== 'string') {
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
