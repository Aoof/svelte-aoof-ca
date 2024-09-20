import { writable } from 'svelte/store';

import type { User } from '$lib/types';

import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';

import axios from 'axios';

export const user = writable({ username: '', token: '' } as User);

export const loggedIn = writable(-1);

export const isLoggedIn = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        user.subscribe(async (value) => {
            if (value.token === '') {
                resolve(false);
            }
            axios.defaults.headers.common['x-auth-token'] = value.token;

            try {
                const response = await axios.post(BACKEND_URL + '/api/auth/verify');
                loggedIn.set(response.data.ok ? 1 : 0);
                resolve(response.data.ok);
            } catch (error : any) {
                loggedIn.set(0);
                resolve(false);
            }
        });
    });
}

export const login = async (username: string, password: string): Promise<{ data?: any, token?: any, ok: boolean, msg : string }> => {
    try {
        const response = await axios.post(BACKEND_URL + '/api/auth/login', {
            username,
            password,
        });

        const data = response.data;

        if (data.ok && data.token) {
            axios.defaults.headers.common['x-auth-token'] = data.token;
            user.set({ username, token: data.token });
        }
        
        return { ok: data.ok, msg: data.msg };
    } catch (error : any) {
        return { ok: false, msg: error.response.data };
    }
};

export const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
        user.subscribe(async (value) => {
            if (value.token === '') {
                return;
            }
            axios.defaults.headers.common['x-auth-token'] = value.token;
            await axios.post(BACKEND_URL + '/api/auth/logout');
            user.set({ username: '', token: ''});

            resolve();
        })
    });
};

export const register = async (username: string, password: string): Promise<{ data?: any, token?: any, ok: boolean, msg : string }> => {
    try {
        const response = await axios.post(BACKEND_URL + '/api/auth/register', {
            username,
            password,
        });

        const data = response.data;

        if (data.ok && data.token) {
            axios.defaults.headers.common['x-auth-token'] = data.token;
            user.set({ username, token: data.token });
        }
    
        return { ok: true, msg: data.msg };
    } catch (error : any) {
        return { ok: false, msg: error.response.data };
    }
};
