import mongoose, { Document, Schema } from 'mongoose';

export interface IBus extends Document {
  owner: mongoose.Types.ObjectId;
  driver: mongoose.Types.ObjectId;
  license_number: string;
  contact?: string;
  type: string;
  is_ac: boolean;
  total_sleepers: number;
  total_seats: number;
}

const busSchema: Schema<IBus> = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  license_number: { type: String, required: true },
  contact: { type: String },
  type: { type: String, required: true },
  is_ac: { type: Boolean, required: true },
  total_sleepers: { type: Number, required: true },
  total_seats: { type: Number, required: true }
});

export default mongoose.model<IBus>('Bus', busSchema);
