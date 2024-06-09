import { writable } from "svelte/store";

export const tags = writable<string[]>([]);

export function addTag(tag: string) {
    tags.update((tags) => [...tags, tag]);
}

export function removeTag(tag: string) {
    tags.update((tags) => tags.filter((t) => t !== tag));
}

export function clearTags() {
    tags.set([]);
}
