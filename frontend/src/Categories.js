import { FaExclamationCircle, FaSpinner } from "react-icons/fa";
import Layout from "./components/Layout";
import useCategories from "./hooks/useCategories";
import { useState } from "react";
import CategoryModal from "./components/CategoryModal";

function Categories() {

    const { categories, loading, error, handleDeleteCategory, handleAddCategory, handleUpdateCategory } = useCategories();
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);


    const handleDelete = (id) => {
        console.log('Deleting category with id:', id);
        handleDeleteCategory(id);
    }

    const handleEdit = (id) => {
        console.log('Editing category with id:', id);
        setCategoryToEdit(id);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <FaSpinner className="text-primary mb-3 spinner-border" size={40} />
                    <p className="fs-4">Loading categories</p>
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
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Categories</h1>
                    </div>
                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => {
                            setOpenModal(true);
                            setIsEditing(false);
                        }}
                    >
                        Add Category
                        <i className="bi bi-plus-circle  ms-2 fs-3 m-0 p-0"></i>
                    </button>
                </div>

                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Category name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.name}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {openModal && (
                <CategoryModal
                    category={categoryToEdit}
                    isEditing={isEditing}
                    onClose={closeModal}
                />
            )}
        </Layout>
    );
}

export default Categories;