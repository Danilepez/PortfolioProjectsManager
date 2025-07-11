export interface Project {
  _id: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  url: string;
  technologies: string[];
}