import mongoose, { Document, Schema } from 'mongoose';

// 1. Interface del modelo
export interface IProject extends Document {
  title: string;
  description: string;
  url: string;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema de Mongoose
const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  url: { type: String, required: true, trim: true },
  technologies: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 3. Middleware para actualizar updatedAt antes de guardar
ProjectSchema.pre<IProject>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// 4. Exportar modelo (reutiliza si ya existe, crea si no)
export default mongoose.models.Project || 
       mongoose.model<IProject>('Project', ProjectSchema);