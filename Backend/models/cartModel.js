import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        courses: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamp: true,
    }
)

export const cartModel = mongoose.model('Cart', cartSchema)