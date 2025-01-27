import express from 'express';
import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/courseController";


const router = express.Router();

router.post('/', addCourse);
router.get('/:id?', getCourses);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);


export const courseRoutes = router;