const NotesFilter = ({ onFilterChange, filter }) => {
    return (
        <div className="d-flex flex-column flex-lg-row gap-3 my-3 justify-content-center">
            <button
                className="btn btn-info"
                style={{
                    margin: '5px',
                    border: filter === "all" ? "2px solid black" : "none",
                }}
                onClick={() => { onFilterChange("all"); }}
            >
                All notes
            </button>

            <button
                className="btn btn-secondary"
                style={{
                    margin: '5px',
                    border: filter === "active" ? "2px solid black" : "none",
                }}
                onClick={() => { onFilterChange("active"); }}
            >
                Active notes
            </button>

            <button
                className="btn btn-warning"
                style={{
                    margin: '5px',
                    border: filter === "archived" ? "2px solid black" : "none",
                }}
                onClick={() => { onFilterChange("archived"); }}
            >
                Archived notes
            </button>
        </div>
    )
}

export default NotesFilter;