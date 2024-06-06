import { writable } from "svelte/store";

import { BACKEND_URL } from "$lib/constants";
import type { Recipe, Ingredient } from "$lib/types";

import axios from "axios";

import { user } from "./auth";

export const recipes = writable<Recipe[]>([]);
export const selectedRecipe = writable<Recipe | null>(null);

export const newRecipe = writable<Recipe>({
    _id: "",
    title: "",
    instructions: "",
    cookTime: "",
    foodType: "",
    tags: [],
    vegetarian: false,
    ingredients: [],
    createdDate: new Date().toISOString(),
});

export const getRecipe = (id: string) => {
    recipes.subscribe((all) => {
        return all.find((r) => r._id === id);
    });
};

export const getAllIngredients = (query? : string) => {
    recipes.subscribe((all) => {
        const ingredients: Ingredient[] = [];
        all.forEach((r) => {
            r.ingredients.forEach((i) => {
                if (query && !i.ingredient.toLowerCase().includes(query.toLowerCase())) { return; }

                if (!ingredients.some((ing) => ing.ingredient === i.ingredient)) {
                    ingredients.push(i);
                }
            });
        });
        return ingredients;
    });
}

export const getAllTags = (query? : string) => {
    recipes.subscribe((all) => {
        const tags: string[] = [];
        all.forEach((r) => {
            r.tags.forEach((t) => {
                if (query && !t.toLowerCase().includes(query.toLowerCase())) { return; }

                if (!tags.includes(t)) {
                    tags.push(t);
                }
            });
        });
        return tags;
    });
}

export const searchRecipes = async (query: string) => { 
    return new Promise(async (resolve, reject) => {
        await fetchRecipes();
        recipes.subscribe((all) => {
            recipes.set(all.filter((r) => {
                return (
                    r.title.toLowerCase().includes(query.toLowerCase()) ||
                    r.ingredients.some((i) => i.ingredient.toLowerCase().includes(query.toLowerCase())) ||
                    r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
                    r.foodType.toLowerCase().includes(query.toLowerCase()) ||
                    r.cookTime.toLowerCase().includes(query.toLowerCase()) ||
                    r.vegetarian.toString().toLowerCase().includes(query.toLowerCase())
                );
            }))
        });

        resolve(recipes);
    });
}

export const fetchRecipes = async () => {
    return new Promise(async (resolve, reject) => {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.get(BACKEND_URL + "/api/recipes");

        const data = response.data;

        if (data.ok) {
            recipes.set(data.recipes);
            resolve(data);
        } else {
            reject(data);
        }
    });
};

export const fetchRecipe = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.get(BACKEND_URL + "/api/recipes/" + id);

        const data = response.data;

        if (data.ok) {
            selectedRecipe.set(data.recipe);
            resolve(data);
        } else {
            reject(data);
        }
    });
};

export const addRecipe = async () => {
    return new Promise(async (resolve, reject) => {
        newRecipe.subscribe(async (recipe) => {
            user.subscribe((value) => {
                axios.defaults.headers.common["x-auth-token"] = value.token;
            });
            const response = await axios.post(BACKEND_URL + "/api/recipes", recipe);

            const data = response.data;

            if (data.ok) {
                resolve(data);
            } else {
                reject(data);
            }
        });
    });
};

export const updateExistingRecipe = async (id: string, recipe: Recipe) => {
    return new Promise(async (resolve, reject) => {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.put(BACKEND_URL + "/api/recipes/" + id, recipe);

        const data = response.data;

        if (data.ok) {
            resolve(data);
        } else {
            reject(data);
        }
    });
};

export const deleteRecipe = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.delete(BACKEND_URL + "/api/recipes/" + id);

        const data = response.data;

        if (data.ok) {
            resolve(data);
        } else {
            reject(data);
        }
    });
};