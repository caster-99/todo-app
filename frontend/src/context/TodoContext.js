import React, { createContext, useReducer } from 'react';
import * as api from "../api/api";

export const NotesContext = createContext();

// Reducer function
const notesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return { ...state, notes: action.payload };
        case 'SET_ARCHIVED_NOTES':
            return { ...state, notes: action.payload };
        case 'ADD_NOTE':
            return { ...state, notes: [...state.notes, action.payload] };
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload : note
                ),
            };
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload),
            };
        case 'ARCHIVE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? { ...note, archived: true } : note
                ),
            };
        case 'UNARCHIVE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? { ...note, archived: false } : note
                ),
            };
        case 'FILTER_BY_CATEGORY':
            return { ...state, notes: action.payload };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

// Notes Provider
export const NotesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, {
        notes: []
    });


    // Fetch notes by user 
    const fetchNotesByUser = async (userId) => {
        const notes = await api.fetchNotesByUser(userId);
        // console.log(notes)
        dispatch({ type: 'SET_NOTES', payload: notes });
    };
    // Fetch archived notes
    const loadArchivedNotes = async (userId) => {
        const notes = await api.fetchArchivedNotes(userId);
        dispatch({ type: 'SET_ARCHIVED_NOTES', payload: notes });
    };

    // Fetch active notes
    const fetchActiveNotes = async (userId) => {
        // console.log(userId)
        const notes = await api.fetchActiveNotes(userId);
        dispatch({ type: 'SET_NOTES', payload: notes });
    }

    // Add a new note
    const addNote = async (note) => {
        const newNote = await api.createNote(note);
        dispatch({ type: 'ADD_NOTE', payload: newNote });
    };

    // Update an existing note
    const updateNote = async (id, updatedNote) => {
        const note = await api.updateNote(id, updatedNote);
        dispatch({ type: 'UPDATE_NOTE', payload: note });
    };

    // Delete a note
    const deleteNote = async (id) => {
        await api.deleteNote(id);
        dispatch({ type: 'DELETE_NOTE', payload: id });
    };

    // Archive a note
    const archiveNote = async (id) => {
        const note = await api.archiveNote(id);
        // console.log(note)
        dispatch({ type: 'ARCHIVE_NOTE', payload: note });
    };

    // Unarchive a note
    const unarchiveNote = async (id) => {
        const note = await api.archiveNote(id); // Assuming the same API endpoint toggles archive status
        dispatch({ type: 'UNARCHIVE_NOTE', payload: note });
    };

    // Add a category to a note
    const addCategoryToNote = async (id, categoryId) => {
        const updatedNote = await api.addCategoryToNote(id, categoryId);
        dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
    };

    // Remove a category from a note
    const removeCategoryFromNote = async (id, categoryId) => {
        const updatedNote = await api.removeCategoryFromNote(id, categoryId);
        dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
    };

    // Filter notes by category
    const filterNotesByCategory = async (categoryId, userId) => {
        const notes = await api.fetchNotesByCategory(categoryId, userId);
        dispatch({ type: 'FILTER_BY_CATEGORY', payload: notes });
    };

    return (
        <NotesContext.Provider
            value={{
                notes: state.notes,
                loadArchivedNotes,
                addNote,
                updateNote,
                deleteNote,
                archiveNote,
                unarchiveNote,
                addCategoryToNote,
                removeCategoryFromNote,
                filterNotesByCategory,
                fetchActiveNotes,
                fetchNotesByUser
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
