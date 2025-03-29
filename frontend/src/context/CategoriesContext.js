import React, { createContext, useContext, useReducer } from 'react';
import * as api from "../api/api";

export const CategoriesContext = createContext();

// Reducer function
const categoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };

        case 'ADD_CATEGORY':
            return { ...state, categories: [...state.categories, action.payload] };

        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.map((category) =>
                    category.id === action.payload.id ? action.payload : category
                ),
            };

        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter((category) => category.id !== action.payload),
            };

        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

// Categories Provider
export const CategoriesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoriesReducer, {
        categories: [],
    });

    // Fetch all categories
    const loadCategories = async () => {
        const categories = await api.fetchCategories();
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
    };

    // Add a new category
    const addCategory = async (category) => {
        const newCategory = await api.createCategory(category);
        dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
    };

    // Update an existing category
    const updateCategory = async (id, updatedCategory) => {
        const category = await api.updateCategory(id, updatedCategory);
        dispatch({ type: 'UPDATE_CATEGORY', payload: category });
    };

    // Delete a category
    const deleteCategory = async (id) => {
        await api.deleteCategory(id);
        dispatch({ type: 'DELETE_CATEGORY', payload: id });
    };


    return (
        <CategoriesContext.Provider
            value={{
                categories: state.categories,
                loadCategories,
                addCategory,
                updateCategory,
                deleteCategory
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

