import { writable } from "svelte/store";

export const searchTags = writable<string[]>([]);
export const recipeTags = writable<string[]>([]);

export function addSearchTag(tag: string) {
    searchTags.update((tags) => [...tags, tag]);
}

export function removeSearchTag(tag: string) {
    searchTags.update((tags) => tags.filter((t) => t !== tag));
}

export function clearSearchTags() {
    searchTags.set([]);
}

export function addRecipeTag(tag: string) {
    recipeTags.update((tags) => [...tags, tag]);
}

export function removeRecipeTag(tag: string) {
    recipeTags.update((tags) => tags.filter((t) => t !== tag));
}

export function clearRecipeTags() {
    recipeTags.set([]);
}