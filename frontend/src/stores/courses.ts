import { writable } from "svelte/store";

import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';
import { user } from "./auth";

import axios from 'axios';

import type { Course } from "$lib/types";

export const courses = writable<Course[]>([]);

export const newCourse = writable<Course>({
    _id: "",
    title: "",
    name: "",
    teacher: "",
    color: "",
    room: "",
    timeframe: {
        start: "06:00",
        end: "06:15",
    },
});

export const getCourses = async () => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.get(BACKEND_URL + '/api/courses');

    const data = response.data;

    if (data.ok) {
        courses.set(data.courses);
    }
};

export const addCourse = async (course: Course) => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.post(BACKEND_URL + '/api/courses', course);

    const data = response.data;

    if (data.ok) {
        courses.update((value) => {
            return [...value, course];
        });
    }
};

export const deleteCourse = async (id: string) => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.delete(BACKEND_URL + '/api/courses/' + id);

    const data = response.data;

    if (data.ok) {
        courses.update((value) => {
            return value.filter((course) => course._id !== id);
        });
    }
};

export const updateCourse = async (course: Course) => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.put(BACKEND_URL + '/api/courses/' + course._id, course);

    const data = response.data;

    if (data.ok) {
        courses.update((value) => {
            return value.map((s) => {
                if (s._id === course._id) {
                    return course;
                }
                return s;
            });
        });
    }
};

export const getCourse = async (id: string) => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.get(BACKEND_URL + '/api/courses/' + id);

    const data = response.data;

    if (data.ok) {
        return data.course;
    }
};
