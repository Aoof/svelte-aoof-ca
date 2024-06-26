import express from 'express';
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/recipes
// @desc    Create a new recipe
// @access  Private
router.post('/', auth, createRecipe);

// @route   GET api/recipes
// @desc    Get all recipes
// @access  Public
router.get('/', getRecipes);

// @route   GET api/recipes/:id
// @desc    Get a recipe by ID
// @access  Public
router.get('/:id', getRecipeById);

// @route   PUT api/recipes/:id
// @desc    Update a recipe by ID
// @access  Private
router.put('/:id', auth, updateRecipe);

// @route   DELETE api/recipes/:id
// @desc    Delete a recipe by ID
// @access  Private
router.delete('/:id', auth, deleteRecipe);

export default router;