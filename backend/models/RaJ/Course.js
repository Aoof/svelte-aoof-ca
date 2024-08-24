import Database from '../../config/db.js';

import { ObjectId } from 'mongodb';

export default class Course {
    constructor(data) {
        this.data = data;
        this.errors = [];

        this.database = new Database();
        this.courseCollection = this.database.db.collection('RaJ/courses');
    }

    cleanUp() {
        if (typeof (this.data.title) != "string") { this.data.title = ""; }
        if (typeof (this.data.students) != "object") { this.data.students = []; }
        if (typeof (this.data.teachers) != "object") { this.data.teachers = []; }
        if (typeof (this.data.time) != "string") { this.data.time = ""; }
        if (typeof (this.data.room) != "string") { this.data.room = ""; }
        if (typeof (this.data.timeframe) != "object") { this.data.timeframe = {}; }

        if (room == "") { this.data.room = "#"; }

        let _id = this.data._id;

        this.data = {
            title: this.data.title.trim(),
            students: this.data.students.map(student => student.trim()),
            teachers: this.data.teachers.map(teacher => teacher.trim()),
            time: this.data.time,
            room: this.data.room,
            timeframe: {
                start: this.data.timeframe.start,
                end: this.data.timeframe.end
            }
        };

        if (_id != '' || _id != undefined) {
            this.data._id = _id;
        }
    }

    validate() {
        return new Promise(async (resolve, reject) => {
            if (this.data.title == "") { this.errors.push("You must provide a title."); }
            if (this.data.students == []) { this.errors.push("You must provide students."); }
            if (this.data.teachers == []) { this.errors.push("You must provide teachers."); }
            if (this.data.time == "") { this.errors.push("You must provide a time."); }
            if (this.data.timeframe.start == "") { this.errors.push("You must provide a start time."); }
            if (this.data.timeframe.end == "") { this.errors.push("You must provide an end time."); }

            resolve();
        });
    }

    findById(id) {
        return new Promise(async (resolve, reject) => {
            if (typeof (id) != "string" || !ObjectId.isValid(id)) {
                reject('Invalid ID');
                return;
            }

            let course = await this.courseCollection.findOne({ _id: new ObjectId(id) });

            if (course) {
                resolve(course);
            } else {
                reject('Course not found');
            }
        });
    }

    async createCourse() {
        try {
            this.cleanUp();
            await this.validate();

            if (this.errors.length > 0) {
                throw this.errors;
            }

            await this.courseCollection.insertOne(this.data);
        } catch (err) {
            throw err;
        }
    }

    async getCourses() {
        try {
            const courses = await this.courseCollection.find().toArray();
            return courses;
        } catch (err) {
            throw err;
        }
    }

    async updateCourse() {
        try {
            this.cleanUp();
            await this.validate();

            if (this.errors.length > 0) {
                throw this.errors;
            }

            await this.courseCollection.updateOne({ _id: new ObjectId(this.data._id) }, { $set: this.data });
        } catch (err) {
            throw err;
        }
    }

    async deleteCourse() {
        try {
            await this.courseCollection.deleteOne({ _id: new ObjectId(this.data._id) });
        } catch (err) {
            throw err;
        }
    }
}