import { writable } from "svelte/store";

import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';
import { user } from "./auth";

import axios from 'axios';

import type { Subject } from "$lib/types";

export const subjects = writable<Subject[]>([]);

export const newSubject = writable<Subject>({
    _id: "",
    subject: "",
    name: "",
    teacher: "",
    color: "",
    room: "",
    timeframe: {
        start: "06:00",
        end: "06:15",
    },
});

export const getSubjects = async () => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.get(BACKEND_URL + '/api/subjects');

    const data = response.data;

    if (data.ok) {
        subjects.set(data.subjects);
    }
};

export const addSubject = async (subject: Subject) => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.post(BACKEND_URL + '/api/subjects', subject);

    const data = response.data;

    if (data.ok) {
        subjects.update((value) => {
            return [...value, subject];
        });
    }
};

export const deleteSubject = async (id: string) => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.delete(BACKEND_URL + '/api/subjects/' + id);

    const data = response.data;

    if (data.ok) {
        subjects.update((value) => {
            return value.filter((subject) => subject._id !== id);
        });
    }
};

export const updateSubject = async (subject: Subject) => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.put(BACKEND_URL + '/api/subjects/' + subject._id, subject);

    const data = response.data;

    if (data.ok) {
        subjects.update((value) => {
            return value.map((s) => {
                if (s._id === subject._id) {
                    return subject;
                }
                return s;
            });
        });
    }
};

export const getSubject = async (id: string) => {
    user.subscribe((value) => {
        axios.defaults.headers.common['x-auth-token'] = value.token;
    });

    const response = await axios.get(BACKEND_URL + '/api/subjects/' + id);

    const data = response.data;

    if (data.ok) {
        return data.subject;
    }
};