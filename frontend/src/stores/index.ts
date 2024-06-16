import { writable } from "svelte/store";

export const page = writable<string>("home");

export const anchors = [
    { name: 'home', icon: 'fas fa-home' },
    { name: 'projects', icon: 'fas fa-project-diagram' },
    { name: 'about', icon: 'fas fa-info' },
    { name: 'contact', icon: 'fas fa-envelope' }
];

export const device = writable<string>("desktop");

export const change_page = (newPage: string) => {
    page.set(newPage);
}