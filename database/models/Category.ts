import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  image: string;
  icon: string;
  count: number;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, required: true },
  count: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
