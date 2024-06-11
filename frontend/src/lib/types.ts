
export interface User {
    id?: string;
    username: string;
    token: string;
}

export interface Ingredient {
    ingredient: string;
    amount: string;
}

export interface Recipe {
    _id: string;
    title: string;
    instructions: string;
    cookTime: string;
    foodType: string;
    tags: string[];
    vegetarian: boolean;
    ingredients: Ingredient[];
    createdDate: Date;
}
