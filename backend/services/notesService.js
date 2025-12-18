const Category = require("../models/Category.js");
const Note = require("../models/Note.js");
const User = require("../models/User.js");

const getAllNotes = async () => {
    try {
        // Fetch all notes along with the associated User and Category
        const notes = await Note.findAll({

            include: [{ model: User, attributes: ['name', 'email'] }, { model: Category, attributes: ['name'] }],
            raw: true, // Flattens data for debugging
            nest: true // Keeps relationships nested
        });

        return notes;
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw new Error("Error fetching notes");
    }
};


const createNote = async (data) => {
    const note = await Note.create(data);
    return note;
};

const updateNote = async (id, data) => {
    const note = await Note.findByPk(id);
    if (!note) throw new Error('Note not found');
    await note.update(data);
    return note;
};

const deleteNote = async (id) => {
    const note = await Note.findByPk(id);
    if (!note) throw new Error('Note not found');
    await note.destroy();
};

const archiveNote = async (id) => {
    const note = await Note.findByPk(id);
    if (!note) throw new Error('Note not found');
    note.archived = !note.archived; // Toggle archived status
    await note.save();
    return note;
};

const listActive = async (userId) => {
    const notes = await Note.findAll({ where: { archived: false, UserId: userId } });
    return notes;
};

const listArchived = async (userId) => {
    const notes = await Note.findAll({ where: { archived: true, UserId: userId } });
    return notes;
};
// Get all notes by a user
const getNotesByUser = async (userId) => {
    console.log(userId)
    try {
        const notes = await Note.findAll({
            where: { UserId: userId },
            include: [{ model: User, attributes: ['name', 'email', 'id'] }, { model: Category, attributes: ['name', 'id'] }],
            raw: true, // Flattens data for debugging
            nest: true // Keeps relationships nested
        });
        return notes;
    } catch (error) {
        throw new Error('Error fetching notes for user: ' + error.message);
    }
};

// Get all notes by a specific category
const getNotesByCategory = async (categoryId) => {
    try {
        const notes = await Note.findAll({
            where: { CategoryId: categoryId },
            include: [{ model: User, attributes: ['name', 'email'] }, { model: Category, attributes: ['name'] }],
            raw: true, // Flattens data for debugging
            nest: true // Keeps relationships nested
        });
        return notes;
    } catch (error) {
        throw new Error('Error fetching notes for category: ' + error.message);
    }
};

// Get all notes by a user and a category
const getNotesByUserAndCategory = async (userId, categoryId) => {
    try {
        const notes = await Note.findAll({
            where: {
                UserId: userId,
                CategoryId: categoryId
            },
            include: [{ model: User, attributes: ['name', 'email'] }, { model: Category, attributes: ['name'] }],
            raw: true, // Flattens data for debugging
            nest: true // Keeps relationships nested
        });
        return notes;
    } catch (error) {
        throw new Error('Error fetching notes for user and category: ' + error.message);
    }
};

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    listActive,
    listArchived,
    getNotesByUser,
    getNotesByCategory,
    getNotesByUserAndCategory
};
