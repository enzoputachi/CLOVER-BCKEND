import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        title: {
            type: String,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
        }
    },
    {
        timpestamp: true,
    }
)

export const videoModel = mongoose.model('Video', videoSchema)