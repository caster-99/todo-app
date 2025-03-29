import useCategories from "../hooks/useCategories";

const CategoryDropdown = ({ categoryId, onCategoryChange }) => {
    const { categories } = useCategories(); // Fetch categories

    return (
        <div className="d-flex justify-content-between align-items-center my-3 gap-3">
            <p className="w-25 m-0"> Filter by category: </p>

            <select
                className="form-control"
                id="category"
                name="categoryId"
                value={categoryId} // Controlled by parent
                onChange={(e) => onCategoryChange(e.target.value)} // Notify parent
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryDropdown;
