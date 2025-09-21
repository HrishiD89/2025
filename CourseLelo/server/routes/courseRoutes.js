import express from 'express';
import { getAllCourses, applyCourse, dropCourse, rateCourse } from "../controllers/courseController.js";

const router = express.Router();

router.get('/courses',getAllCourses);
router.post('/courses/apply/:id',applyCourse);
router.post('/courses/drop/:id',dropCourse);
router.patch('/courses/rate/:id',rateCourse);

export default router