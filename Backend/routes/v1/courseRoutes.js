import express from 'express';
import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../controllers/courseController.js";


const router = express.Router();

router.post('/', addCourse);
router.get('/:id?', getCourses);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);


export default router;