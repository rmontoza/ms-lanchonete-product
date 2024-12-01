import mongoose from 'mongoose';
import { IDatabase } from '../interfaces/IDatabase';

class MongoDatabase implements IDatabase {
  private readonly uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(`${this.uri}&useNewUrlParser=true`);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
}

export { MongoDatabase };
