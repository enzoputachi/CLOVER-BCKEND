import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        videos: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        },
        outline: [{
           point: {
            type: String,
            required: true,
           }
        }],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
    },
    {
        timestamp: true,
    }
)

export const courseModel = mongoose.model('Course', courseSchema)