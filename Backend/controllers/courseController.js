import { addCourseService, deleteCourseService, getCoursesService, updateCourseService } from '../services/courseService';
import asyncHandler from './../middlewares/asyncHandler';

export const addCourse = asyncHandler(async(req, res) => {
    try {
        const { title, description, price, duration, imageUrl, outline } = req.body;

        // Validate
        if (!title || !description || !price || !duration || !imageUrl || !outline) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
    
        // Call the service to add the course
        const newCourse = await addCourseService({
            title,
            description,
            price,
            duration,
            imageUrl,
            outline,
        });

        res.status(201).json({
            messgae: 'Course added successfully',
            course: newCourse,
        })
    } catch (error) {
        
    }

})

export const getCourses = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const filters = req.query;
    
        const result = await getCoursesService({ id, filters })
    
        if (!result || (Array.isArray(result) && result.length === 0)) {
            return res.status(404).json({ message: "Course(s) not found." })
        }

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message})
    }
})

export const updateCourse = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
    
        const updatedCourse = await updateCourseService(id, updateData);
    
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: "Error updating course", error: error.message })
    }
})

export const deleteCourse = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await deleteCourseService(id);

        res.status(200).json(deleteCourse);
    } catch (error) {
        res.status(400).json({ message: "Error deleting course", error: error.message })
    }
})