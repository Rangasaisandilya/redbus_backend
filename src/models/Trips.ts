import mongoose from "mongoose";


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
        enum: ['pending','approved', 'completed', 'cancelled'],
        required: true,
        default:'pending'
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true 
});

export default mongoose.model('Trips',tripsSchema)
