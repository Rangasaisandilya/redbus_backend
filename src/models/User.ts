import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  phone: string;
  password: string;
  name: string;
  role: 'passenger' | 'driver' | 'owner' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['passenger', 'driver', 'owner', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', userSchema);
