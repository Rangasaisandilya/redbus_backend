import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPayment } from '../types';

export interface IPaymentDocument extends IPayment, Document {
    isPaid(): boolean;
    isFailed(): boolean;
    isPending(): boolean;
    markAsPaid(): Promise<IPaymentDocument>;
    markAsFailed(): Promise<IPaymentDocument>;
}

export interface IPaymentModel extends Model<IPaymentDocument> {
    findByBookingId(bookingId: string): Promise<IPaymentDocument[]>;
    findPaidPayments(): Promise<IPaymentDocument[]>;
    findFailedPayments(): Promise<IPaymentDocument[]>;
    findPendingPayments(): Promise<IPaymentDocument[]>;
}

const paymentSchema: Schema = new Schema({
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, required: true, enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'], trim: true },
    transactionId: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'paid', 'failed'], required: true, default: 'pending' },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ transactionId: 1 }, { unique: true });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });
paymentSchema.index({ bookingId: 1, status: 1 });

paymentSchema.methods.isPaid = function(): boolean {
    return this.status === 'paid';
};

paymentSchema.methods.isFailed = function(): boolean {
    return this.status === 'failed';
};

paymentSchema.methods.isPending = function(): boolean {
    return this.status === 'pending';
};

paymentSchema.methods.markAsPaid = function(): Promise<IPaymentDocument> {
    this.status = 'paid';
    this.updatedAt = new Date();
    return this.save();
};

paymentSchema.methods.markAsFailed = function(): Promise<IPaymentDocument> {
    this.status = 'failed';
    this.updatedAt = new Date();
    return this.save();
};

paymentSchema.statics.findByBookingId = function(bookingId: string) {
    return this.find({ bookingId }).populate('bookingId');
};

paymentSchema.statics.findPaidPayments = function() {
    return this.find({ status: 'paid' }).populate('bookingId');
};

paymentSchema.statics.findFailedPayments = function() {
    return this.find({ status: 'failed' }).populate('bookingId');
};

paymentSchema.statics.findPendingPayments = function() {
    return this.find({ status: 'pending' }).populate('bookingId');
};

paymentSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model<IPaymentDocument, IPaymentModel>('Payment', paymentSchema);