import Database from '../config/db.js';

import { ObjectId } from 'mongodb';

export default class Recipe {
    constructor(data) {
        this.data = data;
        this.errors = [];

        this.database = new Database();
        this.recipeCollection = this.database.db.collection('recipes');
    }
    cleanUp() {
        if (typeof (this.data.title) != "string") { this.data.title = ""; }
        if (typeof (this.data.instructions) != "string") { this.data.instructions = ""; }
        if (typeof (this.data.ingredients) != "object") { this.data.ingredients = []; }
        if (typeof (this.data.cookTime) != "string") { this.data.cookTime = ""; }
        if (typeof (this.data.foodType) != "string") { this.data.foodType = ""; }
        if (typeof (this.data.tags) != "object") { this.data.tags = []; }
        if (typeof (this.data.vegetarian) != "boolean") { this.data.vegetarian = true; }

        let _id = this.data._id;

        this.data = {
            title: this.data.title.trim(),
            instructions: this.data.instructions.trim(),
            ingredients: this.data.ingredients,
            foodType: this.data.foodType,
            cookTime: this.data.cookTime,
            tags: this.data.tags,
            vegetarian: this.data.vegetarian,
            createdDate: this.data.createdDate
        };

        if (_id != '' || _id != undefined) {
            this.data._id = _id;
        }
    }
    validate() {
        return new Promise(async (resolve, reject) => {
            if (this.data.title == "") { this.errors.push("You must provide a title."); }
            if (this.data.ingredients == []) { this.errors.push("You must provide ingredients."); }
            if (this.data.instructions == "") { this.errors.push("You must provide instructions."); }
            if (this.data.cookTime == "") { this.errors.push("You must provide a cook time."); }
            if (this.data.foodType == "") { this.errors.push("You must provide a food type."); }

            resolve();
        });
    }
    findById(id) {
        return new Promise(async (resolve, reject) => {
            if (typeof (id) != "string" || !ObjectId.isValid(id)) {
                reject('Invalid ID');
                return;
            }

            let recipe = await this.recipeCollection.findOne({ _id: new ObjectId(id) });

            if (recipe) {
                resolve(recipe);
            } else {
                reject('Recipe not found');
            }
        });
    }
    addRecipe() {
        return new Promise(async (resolve, reject) => {
            this.cleanUp();
            await this.validate();

            if (!this.errors.length) {
                try {
                    this.data.createdDate = new Date();
                    await this.recipeCollection.insertOne(this.data)
                        .then(res => {
                            resolve(res.insertedId.toString());
                        });
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            } else {
                reject(this.errors);
            }
        });
    }
    editRecipe() {
        return new Promise(async (resolve, reject) => {
            this.cleanUp();
            await this.validate();

            if (!this.errors.length) {
                try {
                    await this.recipeCollection.updateOne({ _id: new ObjectId(this.data._id) }, {
                        $set: {
                            title: this.data.title,
                            instructions: this.data.instructions,
                            ingredients: this.data.ingredients,
                            cookTime: this.data.cookTime,
                            foodType: this.data.foodType,
                            vegetarian: this.data.vegetarian,
                            tags: this.data.tags
                        }
                    });
                    resolve();
                } catch (err) {
                    reject(err);
                }
            } else {
                reject(this.errors);
            }
        });
    }
    deleteRecipe() {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(this.data._id);
                await this.recipeCollection.deleteOne({ _id: new ObjectId(this.data._id) });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    getRecipes() {
        return new Promise(async (resolve, reject) => {
            let recipes = await this.recipeCollection.find().toArray();

            recipes = recipes.sort((a, b) => {
                return new Date(b.createdDate) - new Date(a.createdDate);
            });

            resolve(recipes);
        });
    }
}