import Course from '../models/RaJ/Course.js';

// Create a new course
let createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);

    await newCourse.createCourse();
    res.send({ ok: true, msg: ['Course created']});
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

// Get all courses
let getCourses = async (req, res) => {
  try { 
    let course = new Course();
    const courses = await course.getCourses();
    res.send({ courses, ok: true, msg: ['Courses found']});
  } catch (err) {
    err = Array.isArray(err) ? err : [err];
    res.send({ ok: false, msg: err });
  }
};

// Get a course by ID
let getCourseById = async (req, res) => {
  try {
    let course = new Course();
    course = await course.findById(req.params.id);

    if (!course) {
      return res.send({ ok: false, msg: ['Course not found'] });
    }

    res.send({course, ok: true, msg: ['Course found']});
  } catch (err) {
    err = Array.isArray(err) ? err : [err];
    res.send({ ok: false, msg: err });
  }
};

let updateCourse = async (req, res) => {
  try {
    req.body._id = req.params.id;
    let course = new Course(req.body);

    await course.updateCourse();
    res.send({ ok: true, msg: ['Course updated']});
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

let deleteCourse = async (req, res) => {
  try {
    let course = new Course({ _id: req.params.id });

    await course.deleteCourse();
    res.send({ ok: true, msg: ['Course removed']});
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

export {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};