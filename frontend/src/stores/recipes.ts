import { writable } from "svelte/store";

import { BACKEND_URL } from "$lib/constants";
import type { Recipe, Ingredient } from "$lib/types";

import axios from "axios";

import { user } from "./auth";

export const recipes = writable<Recipe[]>([]);
export const allRecipes = writable<Recipe[]>([]);

export const selectedRecipe = writable<Recipe | null>(null);

export const newRecipe = writable<Recipe>({
    _id: "",
    title: "",
    instructions: "",
    cookTime: "30-60 minutes",
    foodType: "Appetizer",
    tags: [],
    vegetarian: true,
    ingredients: [],
    createdDate: new Date(),
});

export const getRecipe = (id: string) => {
    return new Promise(async (resolve, reject) => {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.get(BACKEND_URL + "/api/recipes/" + id);

        const data = response.data;

        if (data.ok) {
            newRecipe.set(data.recipe)
            resolve(data.recipe);
        } else {
            reject(data);
        }
    });
};

export const getAllIngredients = (_recipes : Recipe[], query : string = '') => {
    let queries = query.split("+").map((q) => q.trim());

    const ingredients: Ingredient[] = [];
    _recipes.forEach((r) => {
        r.ingredients.forEach((i) => {
            if (queries && !queries.every((q) => i.ingredient.toLowerCase().includes(q.toLowerCase()))) { return; }

            if (!ingredients.some((ing) => ing.ingredient === i.ingredient)) {
                ingredients.push(i);
            }
        });
    });
    return ingredients.map((i) => i.ingredient);
}

export const getAllTags = (_recipes : Recipe[], query : string = '') => {
    let queries = query.split("+").map((q) => q.trim());
    
    const tags: string[] = [];
    _recipes.forEach((r) => {
        r.tags.forEach((t) => {
            if (queries && !queries.every((q) => t.toLowerCase().includes(q.toLowerCase()))) { return; }

            if (!tags.includes(t)) {
                tags.push(t);
            }
        });
    });
    return tags;
}

export const searchRecipes = (_allRecipes : Recipe[], query: string) => {
    let queries = query.split("+").map((q) => q.trim());    

    recipes.set(_allRecipes.filter((r) => {
        return queries.every((q) => {
            return (
                r.title.toLowerCase().includes(q.toLowerCase()) ||
                r.ingredients.some((i) => i.ingredient.toLowerCase().includes(q.toLowerCase())) ||
                r.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())) ||
                r.foodType.toLowerCase().includes(q.toLowerCase()) 
            );
        });
    }))
};

export const fetchRecipes = async () => {
    return new Promise(async (resolve, reject) => {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.get(BACKEND_URL + "/api/recipes");

        const data = response.data;

        if (data.ok) {
            recipes.set(data.recipes);
            allRecipes.set(data.recipes);
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

export const addRecipe = async (recipe : Recipe) => {
    return new Promise(async (resolve, reject) => {
        recipe.createdDate = new Date();
        
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.post(BACKEND_URL + "/api/recipes", recipe);

        const data = response.data;

        recipe._id = data.insertedId;

        if (data.ok) {
            resolve(data);
        } else {
            reject(data);
        }
    });
};

export const updateRecipe = async (recipe : Recipe) => {
    return new Promise(async (resolve, reject) => {
        if (!recipe._id) {
            reject({ ok: false, message: "Recipe ID not found" });
            return;
        }

        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.put(BACKEND_URL + "/api/recipes/" + recipe._id, recipe);

        const data = response.data;

        if (data.ok) {
            resolve(data);
        } else {
            reject(data);
        }
    });
};

export const deleteRecipe = async (id: string) : Promise<{msg: string[], ok: boolean}> =>{
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