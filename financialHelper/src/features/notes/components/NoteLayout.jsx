import "./Notes.scss"
import {NoteList} from "@/features/notes/components/NoteList.jsx";

export function NoteLayout() {
    return (
        <div className='notes__layout opacity_animation'>
            <NoteList />
        </div>
    )
}