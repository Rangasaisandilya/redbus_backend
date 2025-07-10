import mongoose, { Schema, Document, Model } from 'mongoose';
import { IBooking } from '../types';

export interface IBookingDocument extends Document<IBooking> {
    isActive(): boolean;
    canCancel(): boolean;
    calculateRefund(): number;
}

export interface IBookingModel extends Model<IBookingDocument> {
    findByTrip(tripId: string): Promise<IBookingDocument[]>;
    findActiveBookings(): Promise<IBookingDocument[]>;
}

const passengerSchema = new Schema({
        name: { type: String, required: true, trim: true },
        age: { type: Number, required: true, min: 1, max: 120 },
        gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
        seatNumber: { type: String, required: true, trim: true }
}, { _id: false });

const bookingSchema: Schema = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
        seatNumbers: { type: [String], required: true },
        passengers: [passengerSchema],
        totalAmount: { type: Number, required: true },
        status: { 
                type: String, 
                required: true,
                enum: ['confirmed', 'cancelled', 'completed', 'pending'],
                default: 'pending'
        },
        paymentStatus: { 
                type: String, 
                required: true,
                enum: ['paid', 'pending', 'failed', 'refunded'],
                default: 'pending'
        },
        bookedAt: { type: Date, required: true, default: Date.now }
}, {
        timestamps: true,
        toJSON: {
                virtuals: true,
                transform: function(doc: any, ret: any) {
                        ret.id = ret._id;
                        delete ret._id;
                        delete ret.__v;
                        return ret;
                }
        },
        toObject: {
                virtuals: true,
                transform: function(doc: any, ret: any) {
                        ret.id = ret._id;
                        delete ret._id;
                        delete ret.__v;
                        return ret;
                }
        }
});

bookingSchema.index({ tripId: 1, seatNumbers: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ bookedAt: -1 });


bookingSchema.methods.isActive = function(): boolean {
        return this.status === 'confirmed' && this.paymentStatus === 'paid';
};

bookingSchema.methods.canCancel = function(): boolean {
        return this.status === 'confirmed' || this.status === 'pending';
};

bookingSchema.methods.calculateRefund = function(): number {
        if (this.status === 'cancelled' && this.paymentStatus === 'paid') {
                return this.totalAmount * 0.9; // 10% cancellation fee
        }
        return 0;
};


bookingSchema.statics.findByTrip = function(tripId: string) {
        return this.find({ tripId });
};

bookingSchema.statics.findActiveBookings = function() {
        return this.find({ status: 'confirmed', paymentStatus: 'paid' });
};

export default mongoose.model<IBookingDocument, IBookingModel>('Booking', bookingSchema);
