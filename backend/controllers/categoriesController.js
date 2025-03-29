// controllers/categoriesController.js

const CategoriesService = require('../services/categoriesService.js');

const { getCategories: getAll } = require('../services/categoriesService.js');

const getCategories = async (req, res) => {
    try {
        const categories = await CategoriesService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving categories" });
    }
};

const createCategory = async (req, res) => {
    const { name } = req.body;  // Destructure the name from the request body
    try {
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const newCategory = await CategoriesService.createCategory({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

const addCategoryToNote = async (req, res) => {
    try {
        console.log(req.params.id, req.body.categoryId)
        const note = await CategoriesService.addCategoryToNote(req.params.id, req.body.categoryId);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeCategoryFromNote = async (req, res) => {
    try {
        const note = await CategoriesService.removeCategoryFromNote(req.params.id, req.params.categoryId);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const filterNotesByCategory = async (req, res) => {
    try {
        const notes = await CategoriesService.filterNotesByCategory(req.params.categoryId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    createCategory,
    addCategoryToNote,
    removeCategoryFromNote,
    filterNotesByCategory
};
