const recipeCollection = require('../config/db').collection("recipes");
const { ObjectId } = require('mongodb');

let Recipe = function (data, updateMode = false) {
    this.data = data;
    this.updateMode = updateMode;
    this.errors = [];
}

Recipe.prototype.cleanUp = function () {
    if (typeof (this.data.title) != "string") { this.data.title = ""; }
    if (typeof (this.data.instructions) != "string") { this.data.instructions = ""; }
    if (typeof (this.data.ingredients) != "object") { this.data.ingredients = []; }
    if (typeof (this.data.cookTime) != "string") { this.data.cookTime = ""; }
    if (typeof (this.data.foodType) != "string") { this.data.foodType = ""; }
    if (typeof (this.data.tags) != "object") { this.data.tags = []; }
    if (typeof (this.data.vegetarian) != "boolean") { this.data.vegetarian = false; }

    let _id = this.data._id;

    this.data = {
        title: this.data.title.trim(),
        instructions: this.data.instructions.trim(),
        ingredients: this.data.ingredients,
        foodType: this.data.foodType,
        cookTime: this.data.cookTime,
        tags: this.data.tags,
        vegetarian: this.data.vegetarian,
        createdDate: this.updateMode ? this.data.createdDate : new Date()
    }

    if (this.updateMode) {
        this.data._id = _id;
    }
}

Recipe.prototype.validate = function () {
    return new Promise(async (resolve, reject) => {
        if (this.data.title == "") { this.errors.push("You must provide a title."); }
        if (this.data.ingredients == []) { this.errors.push("You must provide ingredients."); }
        if (this.data.instructions == "") { this.errors.push("You must provide instructions."); }
        if (this.data.cookTime == "") { this.errors.push("You must provide a cook time."); }
        if (this.data.foodType == "") { this.errors.push("You must provide a food type."); }

        let recipeWithTitle = await recipeCollection.findOne({ title: this.data.title });
        if (recipeWithTitle && !this.updateMode) { this.errors.push("That title is already taken."); }

        resolve();
    });
}

Recipe.prototype.findById = function (id) {
    return new Promise(async (resolve, reject) => {
        if (typeof (id) != "string") {
            reject();
            return;
        }

        let recipe = await recipeCollection.findOne({ _id: ObjectId(id) });

        if (recipe) {
            resolve(recipe);
        } else {
            reject();
        }
    });
}

Recipe.prototype.addRecipe = function () {
    return new Promise(async (resolve, reject) => {
        this.cleanUp();
        await this.validate();

        if (!this.errors.length) {
            try {
                await recipeCollection.insertOne(this.data);
                resolve();
            } catch (err) {
                reject(err);
            }
        } else {
            reject(this.errors);
        }
    });
}

Recipe.prototype.editRecipe = function () {
    return new Promise(async (resolve, reject) => {
        this.cleanUp();
        await this.validate();

        if (!this.errors.length) {
            try {
                await recipeCollection.updateOne({ _id: ObjectId(this.data._id) }, { $set: {
                    title: this.data.title,
                    instructions: this.data.instructions,
                    ingredients: this.data.ingredients,
                    cookTime: this.data.cookTime,
                    foodType: this.data.foodType,
                    vegetarian: this.data.vegetarian,
                    tags: this.data.tags,
                    createdDate: this.data.createdDate
                } })
                resolve();
            } catch (err) {
                reject(err);
            }
        } else {
            reject(this.errors);
        }
    });
}

Recipe.prototype.deleteRecipe = function () {
    return new Promise(async (resolve, reject) => {
        try {
            await recipeCollection.deleteOne({ _id: ObjectId(this.data._id) });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

Recipe.prototype.getRecipes = function () {
    return new Promise(async (resolve, reject) => {
        let recipes = await recipeCollection.find().toArray();

        recipes = recipes.sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate);
        });

        resolve(recipes);
    });
}

Recipe.prototype.getIngredients = function () {
    return new Promise(async (resolve, reject) => {
        let ingredients = await recipeCollection.distinct("ingredients");
        ingredients = ingredients.map(ingredient => ingredient.ingredient);

        let uniqueIngredients = [];
        ingredients.forEach(ingredient => {
            if (!uniqueIngredients.includes(ingredient)) {
                uniqueIngredients.push(ingredient);
            }
        });
        resolve(uniqueIngredients);
    });
}

Recipe.prototype.getTags = function () {
    return new Promise(async (resolve, reject) => {
        let tags = await recipeCollection.distinct("tags");
        let uniqueTags = [];

        tags.forEach(tag => {
            if (!uniqueTags.includes(tag)) {
                uniqueTags.push(tag);
            }
        })

        resolve(uniqueTags);
    });
}

Recipe.prototype.getFoodTypes = function () {
    return new Promise(async (resolve, reject) => {
        let foodTypes = await recipeCollection.distinct("foodType");
        let uniqueFoodTypes = [];

        foodTypes.forEach(foodType => {
            if (!uniqueFoodTypes.includes(foodType)) {
                uniqueFoodTypes.push(foodType);
            }
        });

        resolve(uniqueFoodTypes);
    });
}

Recipe.prototype.getCookTimes = function () {
    return new Promise(async (resolve, reject) => {
        let cookTimes = await recipeCollection.distinct("cookTime");
        let uniqueCookTimes = [];

        cookTimes.forEach(cookTime => {
            if (!uniqueCookTimes.includes(cookTime)) {
                uniqueCookTimes.push(cookTime);
            }
        });

        resolve(uniqueCookTimes);
    });
}

module.exports = Recipe;