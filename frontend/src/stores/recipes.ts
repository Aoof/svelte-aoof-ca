import { writable } from "svelte/store";

import axios from "axios";

import { user, BACKEND_URL } from "./auth";

interface Ingredient {
    ingredient: string;
    amount: string;
}

interface Recipe {
    _id: string;
    title: string;
    instructions: string;
    cookTime: string;
    foodType: string;
    tags: string[];
    vegetarian: boolean;
    ingredients: Ingredient[];
}

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
});

export const clearSelectedRecipe = () => {
    selectedRecipe.set(null);
};

export const selectRecipe = (id: string) => {
    recipes.subscribe((all) => {
        selectedRecipe.set(all.find((r) => r._id === id) || null);
    });
};

export const addIngredient = (ingredient: Ingredient) => {
    selectedRecipe.update((recipe) => {
        if (recipe) {
            return { ...recipe, ingredients: [...recipe.ingredients, ingredient] };
        }
        return null;
    });
}

export const addRecipe = () => {
    newRecipe.subscribe((recipe) => {
        recipes.update((all) => [recipe, ...all]);
    });
};

export const removeRecipe = (id: string) => {
    recipes.update((all) => all.filter((r) => r._id !== id));
};

export const updateRecipe = (id: string, recipe: Recipe) => {
    recipes.update((all) => all.map((r) => (r._id === id ? recipe : r)));
};

export const getRecipe = (id: string) => {
    recipes.subscribe((all) => {
        return all.find((r) => r._id === id);
    });
};

export const getRecipes = () => {
    recipes.subscribe((all) => {
        return all;
    });
};

export const updateSelectedRecipe = (recipe: Recipe) => {
    selectedRecipe.set(recipe);
};

export const updateNewRecipe = (recipe: Recipe) => {
    newRecipe.set(recipe);
};

export const updateRecipes = (recipe: Recipe) => {
    recipes.update((all) => all.map((r) => (r._id === recipe._id ? recipe : r)));
};

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
    try {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.get(BACKEND_URL + "/api/recipes");

        const data = response.data;

        if (data.ok) {
            recipes.set(data.recipes);
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        return false;
    }
};

export const fetchRecipe = async (id: string) => {
    try {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.get(BACKEND_URL + "/api/recipes/" + id);

        const data = response.data;

        if (data.ok) {
            selectedRecipe.set(data.recipe);
        }
    } catch (error: any) {
        return false;
    }
};

export const addNewRecipe = async (recipe: Recipe) => {
    try {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.post(BACKEND_URL + "/api/recipes", recipe);

        const data = response.data;

        if (data.ok) {
            newRecipe.set(data.recipe);
        }
    } catch (error: any) {
        return false;
    }
};

export const updateExistingRecipe = async (id: string, recipe: Recipe) => {
    try {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.put(BACKEND_URL + "/api/recipes/" + id, recipe);

        const data = response.data;

        if (data.ok) {
            recipes.update((all) => all.map((r) => (r._id === id ? recipe : r)));
        }
    } catch (error: any) {
        return false;
    }
};

export const deleteRecipe = async (id: string) => {
    try {
        user.subscribe((value) => {
            axios.defaults.headers.common["x-auth-token"] = value.token;
        });
        const response = await axios.delete(BACKEND_URL + "/api/recipes/" + id);

        const data = response.data;

        if (data.ok) {
            recipes.update((all) => all.filter((r) => r._id !== id));
        }
    } catch (error: any) {
        return false;
    }
};