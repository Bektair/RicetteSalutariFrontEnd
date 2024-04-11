import { Component } from "react";
import { ThemeContext } from "../App/App";
import NoteItem from "./NoteItem/NoteItem";
import "./Note.css"


export default function Note({note, onDelete} : any) {
    // themeStyles(dark:boolean){
    //     return{
    //         backgroundColor: dark ? '#333' : '#CCC',
    //         color: dark ? '#CCC' : '#333',
    //         padding: '2rem',
    //         margin: '2rem'
    //     }
    // }

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        // <ThemeContext.Consumer>
        <div className="note-container" >
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={()=>onDelete(note.id)}>
                Delete
            </button>
        </div>   
        // </ThemeContext.Consumer>
    )
    
}