const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
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

    const recipe = await newRecipe.save();
    res.json({ recipe, ok: true, msg: ['Recipe created']});
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

// Get all recipes
exports.getRecipes = async (req, res) => {
  try { 
    let recipe = new Recipe();
    const recipes = await recipe.getRecipes();
    res.json({ recipes, ok: true, msg: ['Recipes found']});
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    let recipe = new Recipe();
    recipe = await recipe.findById(req.params.id);

    if (!recipe) {
      return res.json({ ok: false, msg: ['Recipe not found'] });
    }

    res.json({recipe, ok: true, msg: ['Recipe found']});
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
  const { title, instructions, ingredients, foodType, cookTime, tags, vegetarian } = req.body;

  const recipeFields = {};
  if (title) recipeFields.title = title;
  if (instructions) recipeFields.instructions = instructions;
  if (ingredients) recipeFields.ingredients = ingredients;
  if (foodType) recipeFields.foodType = foodType;
  if (cookTime) recipeFields.cookTime = cookTime;
  if (tags) recipeFields.tags = tags;
  if (vegetarian !== undefined) recipeFields.vegetarian = vegetarian;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.json({ ok: false, msg: ['Recipe not found'] });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: recipeFields },
      { new: true }
    );

    res.json({ recipe, ok: true, msg: ['Recipe updated'] });
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.json({ ok: false, msg: ['Recipe not found'] });
    }

    await recipe.remove();

    res.json({ ok: true, msg: ['Recipe removed'] });
  } catch (err) {
    console.error(err.message);
    res.send({ ok: false, msg: ['Server error'] });
  }
};
