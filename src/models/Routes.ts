import mongoose from "mongoose";


const routesSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    to: {
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    estimatedDuration: {
        type: String,
        required: true,
        trim: true
    },
    distance: {
        type: Number,
        required: true
    },
    stops:{
        type:Array,
        reuired:true
    }
}, {
    timestamps: true
});

export default mongoose.model('Routes', routesSchema)
