import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    {
        timestamp: true,
    }
)

export const cartModel = mongoose.model('Cart', cartSchema)