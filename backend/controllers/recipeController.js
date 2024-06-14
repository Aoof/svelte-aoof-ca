import Recipe from '../models/Recipe.js';

// Create a new recipe
let createRecipe = async (req, res) => {
  const { title, instructions, ingredients, foodType, cookTime, tags, vegetarian } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      instructions,
      ingredients,
      foodType,
      cookTime,
      tags,
      vegetarian
    });

    const insertedId = await newRecipe.addRecipe();
    res.json({ insertedId, ok: true, msg: ['Recipe created']});
  } catch (err) {
    res.json({ ok: false, msg: ['Server error'] });
  }
};

// Get all recipes
let getRecipes = async (req, res) => {
  try { 
    let recipe = new Recipe();
    const recipes = await recipe.getRecipes();
    res.json({ recipes, ok: true, msg: ['Recipes found']});
  } catch (err) {
    err = Array.isArray(err) ? err : [err];
    res.json({ ok: false, msg: err });
  }
};

// Get a recipe by ID
let getRecipeById = async (req, res) => {
  try {
    let recipe = new Recipe();
    recipe = await recipe.findById(req.params.id);

    if (!recipe) {
      return res.json({ ok: false, msg: ['Recipe not found'] });
    }

    res.json({recipe, ok: true, msg: ['Recipe found']});
  } catch (err) {
    err = Array.isArray(err) ? err : [err];
    res.json({ ok: false, msg: err });
  }
};

// Update a recipe by ID
let updateRecipe = async (req, res) => {
  try {
    req.body._id = req.params.id;
    let recipe = new Recipe(req.body);

    await recipe.editRecipe();

    res.json({ recipe, ok: true, msg: ['Recipe updated'] });
  } catch (err) {
    err = Array.isArray(err) ? err : [err];
    res.json({ ok: false, msg: err });
  }
};

let deleteRecipe = async (req, res) => {
  try {
    let recipe = new Recipe({ _id: req.params.id });

    await recipe.deleteRecipe();

    res.json({ ok: true, msg: ['Recipe removed'] });
  } catch (err) {
    err = Array.isArray(err) ? err : [err];
    res.json({ ok: false, msg: err });
  }
};

export { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };