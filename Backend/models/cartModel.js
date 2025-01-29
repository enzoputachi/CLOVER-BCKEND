import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        userId: {
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