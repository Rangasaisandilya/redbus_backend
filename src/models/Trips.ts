import mongoose from "mongoose";


const passengerSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        age: { type: Number, required: true, min: 1, max: 120 },
        gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
        seatNumber: { type: String, required: true, trim: true }
}, { _id: false });

const tripsSchema = new mongoose.Schema({
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Routes',
        required: true
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    availableSleepers: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'completed', 'cancelled'],
        default: 'pending'
    },
    price: {
        type: Number,
        required: true
    },
    passengers:[passengerSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Trips', tripsSchema)
