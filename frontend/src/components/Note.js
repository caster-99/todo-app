import CustomCheckbox from "./CustomCheckbox";

const Note = ({ note, onDelete, onArchive, onUnarchive, onEdit }) => {

    return (

        <div className={`rounded-2 card ${note.archived ? "bg-off-gray" : "bg-off-white"}`} key={note.id} >
            <div className=" card-body d-flex justify-content-start gap-3 align-items-start align-items-lg-center flex-column flex-lg-row">
                <CustomCheckbox checked={note.archived} onChange={() => { note.archived ? onUnarchive(note.id) : onArchive(note.id) }} />

                <div className="w-100 d-flex flex-column flex-wrap text-wrap">

                    <h5 className="card-title" style={{
                        textDecoration: note.archived ? "line-through" : "none"
                    }}>{note.title}</h5>
                    <p className="card-text text-wrap text-break">
                        {note.content}
                    </p>

                    <p className="card-text "><i className="bi bi-tag "></i>: {note.Category && note.Category.name}</p>
                </div>
                <div className="d-flex w-md-100 w-lg-auto flex-column flex-lg-row gap-3 h-75">
                    <button className="btn btn-danger" onClick={() => {
                        window.confirm("Are you sure you want to delete this note?") && onDelete(note.id)
                    }} >
                        <i className="bi bi-trash"></i>
                        Delete
                    </button>

                    <button className="btn btn-success" onClick={() => onEdit(note)} >
                        <i className="bi bi-pencil"></i>
                        Edit

                    </button>

                </div>
            </div>
        </div>

    );
}
export default Note;