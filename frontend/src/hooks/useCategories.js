import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';

// Custom hook for accessing categories data and actions
const useCategories = () => {
    const {
        categories,
        loadCategories,
        addCategory,
        updateCategory,
        deleteCategory,
    } = useContext(CategoriesContext);

    // Loading and error state management
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                await loadCategories();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []); // Empty dependency array ensures it only runs once on mount



    // Add a new note
    const handleAddCategory = async (note) => {
        setLoading(true);
        try {
            await addCategory(note);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update a note
    const handleUpdateCategory = async (id, updatedCategory) => {
        setLoading(true);
        try {
            await updateCategory(id, updatedCategory);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a note
    const handleDeleteCategory = async (id) => {
        setLoading(true);
        try {
            await deleteCategory(id);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        loading,
        error,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
    };
};


export default useCategories;
