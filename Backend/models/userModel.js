import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],
        purchasedCourses: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamp: true
    }
)

const userModel = mongoose.model('User', userSchema);
export default userModel;