// Fae section
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

// RaJ section
export interface Timeframe {
    start: string;
    end: string;
}

export interface TimeframeIndex {
    start: number;
    end: number;
}

export interface Subject {
    _id?: string;
    subject: string;
    name: string;
    teacher: string;
    color: string;
    room: string;
    timeframe: Timeframe;
    timeframeIndex?: TimeframeIndex;
}