import mongoose from 'mongoose';

// Suppress strictQuery warning
mongoose.set('strictQuery', false);

export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bloomandbox';
  
  try {
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('admin:admin@cluster.mongodb.net')) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB successfully.');
    } else {
      console.log('MONGODB_URI not provided or default mock. Using in-memory storage.');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
