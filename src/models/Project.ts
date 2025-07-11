import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  url: string;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  url: { type: String, required: true, trim: true },
  technologies: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ProjectSchema.pre<IProject>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Project || 
       mongoose.model<IProject>('Project', ProjectSchema);