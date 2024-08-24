import express from 'express';

import {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../controllers/courseController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/courses
// @desc    Create a new course
// @access  Private
router.post('/', auth, createCourse);

// @route   GET api/courses
// @desc    Get all courses
// @access  Private
router.get('/', auth, getCourses);

// @route   GET api/courses/:id
// @desc    Get a course by ID
// @access  Private
router.get('/:id', auth, getCourseById);

// @route   PUT api/courses/:id
// @desc    Update a course by ID
// @access  Private
router.put('/:id', auth, updateCourse);

// @route   DELETE api/courses/:id
// @desc    Delete a course by ID
// @access  Private
router.delete('/:id', auth, deleteCourse);

export default router;