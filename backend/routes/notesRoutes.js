// routes/notesRoutes.js

const express = require('express');
const { createNote, updateNote, deleteNote, archiveNote, listActiveNotes, listArchivedNotes, getAllNotes, getNotesByUser, getNotesByCategory, getNotesByUserAndCategory } = require('../controllers/notesController.js');
const authenticate = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', authenticate, getAllNotes);
router.post('/', authenticate, createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/archive', archiveNote);
router.get('/archived/:userId', listArchivedNotes);
router.get('/active/:userId', listActiveNotes);
// Get all notes by user ID
router.get('/user/:userId', getNotesByUser);

// Get all notes by category ID
router.get('/categories/:categoryId', getNotesByCategory);

// Get all notes by user ID and category ID
router.get('/user/:userId/categories/:categoryId', getNotesByUserAndCategory);

module.exports = router;
