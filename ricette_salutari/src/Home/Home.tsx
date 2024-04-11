import { useState, useEffect } from "react"
import api from "../App/api"
import Note from "../Note/Note"
import "./Home.css"

function Home() {
    const [notes, setNotes] = useState<INote[]>([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    interface INote {
        id : string,

    }

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((err) => alert(err))
    }

    const deleteNote = (id: Number) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note deleted!")
            else alert("Failed to delete note")
            getNotes();
        }).catch((error) => alert(error));
    };

    const createNote = (e: React.FormEvent) => {
        e.preventDefault();
        api.post("/api/notes/", { content, title }).then((res) => {
            if (res.status == 201) alert("Note created!")
            else alert("Failed to make")
            getNotes();
        }).catch((error) => alert(error));
    };


    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note)=> 
                <Note note={note} onDelete={deleteNote} key={note.id}></Note>
            )}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br />
            <input type="text" id="title" name="title" required 
                onChange={(e) => setTitle(e.target.value)} value={title} />
            <label htmlFor="content">Content:</label>
            <br/>
            <textarea name="content" id="content" required value={content} 
                onChange={(e)=> setContent(e.target.value)}></textarea>
            <br/>
            <input type="submit" value="Submit"></input> 
        </form>
    </div>
}

export default Home