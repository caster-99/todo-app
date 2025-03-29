import React, { useEffect, useState } from 'react';
import useNotes from '../hooks/useNotes';
import useCategories from '../hooks/useCategories';

const CategoryModal = ({ category, isEditing, onClose }) => {
    const { handleAddCategory, handleUpdateCategory } = useCategories();

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    // If editing, populate state with category data
    useEffect(() => {
        if (isEditing && category) {
            setName(category.name);
        }
        if (!isEditing) {
            setName('');
        }
    }, [isEditing, category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Validate input fields
        if (!name) {
            alert('Please fill in all fields');
            return;
        }

        const newNote = { name };

        if (isEditing) {
            // Call the update function if editing
            handleUpdateCategory(category.id, newNote);
        } else {
            // Call the add function if creating
            handleAddCategory(newNote);
        }

        // Clear the form after submission
        setName('');
        setLoading(false);
        onClose();
    };

    return (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-name">{isEditing ? 'Edit Note' : 'Add Note'}</h5>
                        <button type="button" className="close btn btn-close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>


                            <button type="submit" className="btn btn-primary"
                                disabled={loading}>
                                {isEditing ? 'Update' : 'Add'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
