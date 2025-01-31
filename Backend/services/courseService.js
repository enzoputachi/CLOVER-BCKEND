/**
 * Create a course
 * get courses
 * update course
 * delete course
 * 
 */

import { courseModel } from "../models/courseModel.js";
import {
  formatCourseResponse,
  formatCoursesResponse,
} from "./../utils/formatResponse.js";

export const addCourseService = async(payload) => {
    try {
        const course = await courseModel.create(payload)
        return course;
    } catch (error) {
       throw new Error(`Error creating course: ${error.message}`);
    }
}


export const getCoursesService = async({ id, filters = {}}) => {
    try {
        if (id) {
           const course = await courseModel.findById(id).exec()
           return formatCourseResponse(course)
        }

        const courses = await courseModel.find(filters).exec();
        return formatCoursesResponse(courses)
    } catch (error) {
        throw new Error(`Error fetching course: ${error.message}`)
    }
}

export const updateCourseService = async(id, updateData) => {
    try {
        const updatedCourse = courseModel.findByIdAndUpdate(id, updateData, {new: true, runValidators: true}).exec();
        
        if(!updatedCourse) throw new Error(`Course not found.`);

        return updatedCourse;        
    } catch (error) {
        throw new Error(`Error updating course: ${error.message}`);
    }
}

export const deleteCourseService = async(id) => {
    try {
       const deletedCourse = courseModel.findByIdAndDelete(id).exec();
       if (!deletedCourse) throw new Error('Course not found.');
       return deletedCourse;
    } catch (error) {
        throw new Error(`Error deleting course: ${error.message}`);
    }
}
