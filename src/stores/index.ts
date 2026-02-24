import { writable } from "svelte/store";

export const page = writable<string>("home");

export const language = writable<string>("en");

export const anchors = [
    { name: 'home', href: "/"},
    { name: 'about', href: "/about"},
    { name: 'projects', href: "/projects"},
    { name: 'contact', href: "/contact"}
];

export const device = writable<string>("desktop");

export const change_page = (newPage: string) => {
    page.set(newPage);
}

export const change_lang = (newLang: string) => {
    language.set(newLang);
}
