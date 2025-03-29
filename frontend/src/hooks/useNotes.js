import { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../context/TodoContext';
import useAuth from './useAuth';

// Custom hook for accessing notes data and actions
const useNotes = () => {
    const {
        notes,
        archivedNotes,
        filteredNotes,
        loadNotes,
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
    } = useContext(NotesContext);

    // Loading and error state management
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const fetchNotes = async (userId) => {
        setLoading(true);
        try {
            await fetchNotesByUser(userId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all notes on component mount
    useEffect(() => {
        fetchNotes(user.id);
    }, []); // Empty dependency array ensures it only runs once on mount

    // Fetch archived notes
    const fetchArchivedNotes = async (userId) => {
        setLoading(true);
        try {
            await loadArchivedNotes(userId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch notes by user
    const handleFetchNotesByUser = async (userId) => {
        setLoading(true)
        try {
            await fetchNotesByUser(userId)

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Fetch active notes
    const handleFetchActiveNotes = async (userId) => {
        // console.log('fetching active notes');
        // console.log(userId)
        setLoading(true);
        try {
            await fetchActiveNotes(userId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new note
    const handleAddNote = async (note) => {
        setLoading(true);
        try {
            await addNote(note);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update a note
    const handleUpdateNote = async (id, updatedNote) => {
        setLoading(true);
        try {
            await updateNote(id, updatedNote);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a note
    const handleDeleteNote = async (id) => {
        setLoading(true);
        try {
            await deleteNote(id);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Archive a note
    const handleArchiveNote = async (id) => {
        setLoading(true);
        try {
            await archiveNote(id); // API call handled in context
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUnarchiveNote = async (id) => {
        setLoading(true);
        try {
            await unarchiveNote(id); // API call handled in context
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    // Add a category to a note
    const handleAddCategoryToNote = async (id, categoryId) => {
        setLoading(true);
        try {
            await addCategoryToNote(id, categoryId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Remove a category from a note
    const handleRemoveCategoryFromNote = async (id, categoryId) => {
        setLoading(true);
        try {
            await removeCategoryFromNote(id, categoryId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Filter notes by category
    const handleFilterByCategory = async (categoryId) => {
        setLoading(true);
        try {
            await filterNotesByCategory(categoryId, user.id);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    return {
        notes,
        archivedNotes,
        filteredNotes,
        loading,
        error,
        fetchArchivedNotes,
        handleAddNote,
        handleUpdateNote,
        handleDeleteNote,
        handleArchiveNote,
        handleUnarchiveNote,
        handleAddCategoryToNote,
        handleRemoveCategoryFromNote,
        handleFilterByCategory,
        handleFetchActiveNotes,
        handleFetchNotesByUser
    };
};

export default useNotes;
