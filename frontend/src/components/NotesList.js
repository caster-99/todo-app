import React, { useEffect, useState } from 'react';
import useNotes from '../hooks/useNotes';
import NotesFilter from './NotesFilter';
import Note from './Note';
import CategoryDropdown from './CategoryDropdown';
import AddNote from './AddNote';
import { FaSpinner, FaExclamationCircle, FaStickyNote } from "react-icons/fa";
import useAuth from '../hooks/useAuth';


const NotesList = () => {
    const {
        notes, loading, error, fetchArchivedNotes,
        handleArchiveNote, handleDeleteNote,
        handleFetchNotesByUser, handleFetchActiveNotes,
        handleFilterByCategory, handleUnarchiveNote
    } = useNotes();

    const [filter, setFilter] = useState("all");
    const [categoryId, setCategoryId] = useState(''); // Control category selection
    const [openModal, setOpenModal] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useAuth();


    // Close modal
    const closeModal = () => {
        setOpenModal(false);
        handleFetchNotesByUser(user.id); // Reload notes
    };

    // Archive handler
    const archiveHandler = (id) => {
        handleArchiveNote(id);
    };

    // Unarchive handler
    const unarchiveHandler = (id) => {
        handleUnarchiveNote(id);
    };


    // Handle filter change
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCategoryId(''); // Reset category selection
        switch (newFilter) {
            case "all":
                handleFetchNotesByUser(user.id);
                break;
            case "archived":
                fetchArchivedNotes(user.id);
                break;
            case "active":
                handleFetchActiveNotes(user.id);
                break;
            default:
                handleFetchNotesByUser(user.id);
                break;
        }
    };

    // Handle category change
    const handleCategoryChange = (id) => {
        setCategoryId(id); // Update the state in parent
        setFilter("all"); // Reset filter
        if (id === "") {
            handleFetchNotesByUser(user.id); // Fetch all notes if no category selected
        } else {
            handleFilterByCategory(id); // Filter by category
        }
    };

    // Handle edit note
    const handleEditNote = (note) => {
        setNoteToEdit(note);
        setIsEditing(true);
        setOpenModal(true);
    };


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <FaSpinner className="text-primary mb-3 spinner-border" size={40} />
                    <p className="fs-4">Loading notes</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <FaExclamationCircle className="text-danger mb-3" size={40} />
                    <p className="fs-4">Error: {error}</p>
                </div>
            </div>
        );
    }


    return (
        <div>

            <button
                className="btn btn-primary w-100"
                onClick={() => {
                    setOpenModal(true);
                    setIsEditing(false);
                }}
            >
                Add Note
                <i className="bi bi-plus-circle  ms-2 fs-3 m-0 p-0"></i>
            </button>

            {/* Pass selected category and handler */}
            <CategoryDropdown
                categoryId={categoryId}
                onCategoryChange={handleCategoryChange}
            />

            <div className="d-flex justify-content-between flex-column my-3 gap-3 p-3 p-lg-5 bg-cream rounded-1">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            onDelete={handleDeleteNote}
                            onArchive={archiveHandler}
                            onEdit={handleEditNote}
                            onUnarchive={unarchiveHandler}
                        />
                    ))
                ) : (
                    <div className="d-flex justify-content-center align-items-center py-5">
                        <div className="text-center">
                            <FaStickyNote className="text-secondary mb-3" size={40} />
                            <h2 className="fs-4">No notes found</h2>
                        </div>
                    </div>
                )}
            </div>

            <NotesFilter
                onFilterChange={handleFilterChange}
                filter={filter}
            />

            {openModal && (
                <AddNote
                    note={noteToEdit}
                    isEditing={isEditing}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default NotesList;
