import { NextApiRequest, NextApiResponse } from 'next';
import { 
  updateProject, 
  deleteProject,
  getProjectById 
} from '@/controllers/projectController';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':   
      return getProjectById(req, res);
    case 'PUT':
      return updateProject(req, res);
    case 'DELETE':
      return deleteProject(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}