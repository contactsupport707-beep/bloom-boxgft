import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  videos: string[];
  rating: number;
  reviews: number;
  isTrending: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isTrending: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
