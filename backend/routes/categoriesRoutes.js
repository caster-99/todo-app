const express = require('express');
const { addCategoryToNote, removeCategoryFromNote, filterNotesByCategory, createCategory, getCategories } = require('../controllers/categoriesController.js');

const router = express.Router();
// Define the GET route to fetch all categories
router.get('/', getCategories);

// Define the POST route to create a category
router.post('/', createCategory);

// Route for adding a category to a note
router.post('/:id/categories', addCategoryToNote);

// Route for removing a category from a note
router.delete('/:id/categories/:categoryId', removeCategoryFromNote);

// Route for filtering notes by category
router.get('/category/:categoryId', filterNotesByCategory);

module.exports = router;
