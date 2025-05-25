import {Note} from "@/features/notes/components/Note.jsx";
import {NoteService} from "@/features/notes/service/noteService.js";
import {useModal} from "@/shared/hooks/useModal.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Container} from "react-bootstrap";

export function NoteList() {
    const [notes, setNotes] = useState([]);
    const [queryParams, setQueryParams] = useState('');

    const {updateItems, setUpdateItems, setIsActive, setModal, baseInfo, setBaseInfo, setSubmitHandler} = useModal()

    const noteService = new NoteService();
    const params = useParams();

    const handleAddNote = async data => {
        try {
            // console.log(data)
            const dataToSend = {
                info: {
                    content: data.content
                }
            }
            const response = await noteService.create(dataToSend)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            console.error("Не удалось добавить заметку: " + err)
        }
    }

    const handleUpdateNote = async data => {
        try {
            const dataToSend = {
                id: data.id,
                content: data.content
            }
            const response = await noteService.update(dataToSend)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            console.error("Не удалось изменить заметку: " + err)
        }
    }

    const handleDeleteNote = async ({data, id}) => {
        try {
            const response = await noteService.delete(id)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            console.error("Не удалось удалить заметку: " + err)
        }
    }

    const handleCompleteNote = async data => {
        try {
            const response = await noteService.complete(data)
            setUpdateItems(!updateItems)
        } catch (err) {
            console.error("Не удалось отметить заметку: " + err)
        }
    }

    function openModal(modalName, data, noteId) {
        setIsActive(true)
        setModal(modalName)
        if (modalName === 'addNote') {
            setSubmitHandler(() => handleAddNote)
        } else if (modalName === 'updateNote') {
            setBaseInfo({id: noteId, content: data.info.content})
            setSubmitHandler(() => handleUpdateNote)
        } else if (modalName === 'confirm') {
            setBaseInfo({name: "заметку"})
            setSubmitHandler(() => (data) =>
                handleDeleteNote({...data, id: noteId})
            )
        } else if (modalName === 'complete') {
            handleCompleteNote(data)
                .then()
                .catch(err => console.error(err))
        } else if (modalName === 'filterNotes') {

        }
    }

    useEffect(() => {
        // console.log(params.id)
        noteService.list(params.id)
            .then(res => {
                setNotes(res.notes)
            })
            .catch(error => console.error(error));
    }, [updateItems, queryParams])

    return (
        <Container className='notes__container'>
            <div className='notes__title'>Заметки</div>
            <div className='notes__list'>
                {notes.map((note) => (
                    <Note note={note} openModal={openModal} key={note.id} />
                ))}
            </div>
            <button onClick={() => openModal('addNote')} className='note__button primary-button'>Добавить</button>
        </Container>
    )
}