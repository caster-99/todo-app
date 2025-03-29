import React, { useEffect, useState } from 'react';
import useNotes from '../hooks/useNotes';
import useCategories from '../hooks/useCategories';
import useAuth from '../hooks/useAuth';

const AddNote = ({ note, isEditing, onClose }) => {
    const { handleAddNote, handleUpdateNote } = useNotes();
    const { categories } = useCategories();
    const { user } = useAuth();

    // Initialize state for title, content, categoryId, and noteId
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [noteId, setNoteId] = useState(null);
    const [loading, setLoading] = useState(false);

    // If editing, populate state with note data
    useEffect(() => {
        if (isEditing && note) {
            setTitle(note.title);
            setContent(note.content);
            setCategoryId(note.CategoryId || ''); // Ensure there's a default value
            setNoteId(note.id);
        }
        if (!isEditing) {
            setTitle('');
            setContent('');
            setCategoryId('');
        }
    }, [isEditing, note]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Validate input fields
        if (!title || !content || !categoryId) {
            alert('Please fill in all fields');
            return;
        }

        const newNote = { title, content, UserId: user.id, archived: false, CategoryId: categoryId };

        if (isEditing) {
            // Call the update function if editing
            handleUpdateNote(noteId, newNote);
        } else {
            // Call the add function if creating
            handleAddNote(newNote);
        }

        // Clear the form after submission
        setTitle('');
        setContent('');
        setCategoryId('');
        setLoading(false);
        onClose();
    };

    return (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title">{isEditing ? 'Edit Note' : 'Add Note'}</h5>
                        <button type="button" className="close btn btn-close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    required
                                    minLength={3}
                                    maxLength={255}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    value={content}
                                    required
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="category">Category</label>
                                <select
                                    className="form-control"
                                    id="category"
                                    required
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary"
                                disabled={loading}
                            >
                                {isEditing ? 'Update' : 'Add'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
