// controllers/notesController.js`

const NotesService = require('../services/notesService.js');

const getAllNotes = async (req, res) => {
    try {
        const notes = await NotesService.getAllNotes();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving notes" });
    }
};


const createNote = async (req, res) => {
    try {
        const note = await NotesService.createNote(req.body);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await NotesService.updateNote(req.params.id, req.body);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        await NotesService.deleteNote(req.params.id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const archiveNote = async (req, res) => {
    try {
        const note = await NotesService.archiveNote(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const listActiveNotes = async (req, res) => {
    try {
        const { userId } = req.params;
        const notes = await NotesService.listActive(userId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const listArchivedNotes = async (req, res) => {
    try {
        const { userId } = req.params;
        const notes = await NotesService.listArchived(userId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all notes for a specific user
const getNotesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notes = await NotesService.getNotesByUser(userId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all notes for a specific category
const getNotesByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const notes = await NotesService.getNotesByCategory(categoryId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all notes for a user in a specific category
const getNotesByUserAndCategory = async (req, res) => {
    try {
        const { userId, categoryId } = req.params;
        const notes = await NotesService.getNotesByUserAndCategory(userId, categoryId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    listActiveNotes,
    listArchivedNotes,
    getNotesByUser,
    getNotesByCategory,
    getNotesByUserAndCategory
};
