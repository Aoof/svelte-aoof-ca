import { writable } from "svelte/store";
import { locale, setLocale } from '$lib/i18n';

export const page = writable<string>("home");

export const language = locale;

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

export const change_lang = async (newLang: string) => {
    await setLocale(newLang);
}
