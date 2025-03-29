const Note = require('../models/Note.js');
const Category = require('../models/Category.js');

const getCategories = async () => {
    try {
        // Fetch all categories from the database
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Error fetching categories");
    }
};

const createCategory = async (categoryData) => {
    try {
        // Create a new category in the database
        const category = await Category.create(categoryData);
        return category;
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Error creating category");
    }
};

const addCategoryToNote = async (noteId, categoryId) => {
    const note = await Note.findByPk(noteId);
    if (!note) throw new Error('Note not found');

    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');

    // update categoryId on note


    return note;
};

const removeCategoryFromNote = async (noteId, categoryId) => {
    const note = await Note.findByPk(noteId);
    if (!note) throw new Error('Note not found');

    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');

    await note.removeCategory(category); // Removes the category from the note
    return note;
};

const filterNotesByCategory = async (categoryId) => {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');

    const notes = await category.getNotes(); // Get notes associated with this category
    return notes;
};

module.exports = {
    getCategories,
    createCategory,
    addCategoryToNote,
    removeCategoryFromNote,
    filterNotesByCategory
};
