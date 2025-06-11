import {Note} from "@/features/notes/components/Note.jsx";
import {NoteService} from "@/features/notes/service/noteService.js";
import {useModal} from "@/shared/hooks/useModal.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Container} from "react-bootstrap";
import {toast} from "react-toastify";
import {SlidersHorizontal} from "lucide-react";

export function NoteList() {
    const [notes, setNotes] = useState([]);
    const [queryParams, setQueryParams] = useState('');
    const [usedParams, setUsedParams] = useState([])
    const {updateItems, setUpdateItems, setIsActive, setModal, baseInfo, setBaseInfo, setSubmitHandler} = useModal()

    const noteService = new NoteService();
    const params = useParams();

    const handleAddNote = async data => {
        try {
            // console.log(data)
            const dataToSend = {
                info: {
                    content: data.content.trim()
                }
            }
            const response = await noteService.create(dataToSend)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            if (err.message.includes("All fields")) {
                toast.error("Заполните все поля")
            } else if (err.status === undefined) {
                toast.error("Ошибка подключения к серверу")
            } else {
                toast.error("Ошибка добавления заметки: " + err.message)
            }
            console.error("Не удалось добавить заметку: " + err)
        }
    }

    const handleUpdateNote = async data => {
        try {
            const dataToSend = {
                id: data.id,
                content: data.content.trim()
            }
            const response = await noteService.update(dataToSend)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            if (err.message.includes("All fields")) {
                toast.error("Заполните все поля")
            } else if (err.status === undefined) {
                toast.error("Ошибка подключения к серверу")
            } else if (err.status !== 401) {
                toast.error("Ошибка обновления заметки: " + err.message)
            }
            console.error("Не удалось изменить заметку: " + err)
        }
    }

    const handleDeleteNote = async ({data, id}) => {
        try {
            const response = await noteService.delete(id)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            if (err.status !== 401) {
                toast.error("Ошибка удаления заметки: " + err.message)
            }
            console.error("Не удалось удалить заметку: " + err)
        }
    }

    const handleCompleteNote = async data => {
        try {
            console.log("in complete node")
            const response = await noteService.complete(data)
            setUpdateItems(!updateItems)
            console.log(updateItems)
        } catch (err) {
            if (err.status !== 401) {
                toast.error("Ошибка при изменении состояни заметки: " + err.message)
            }
            console.error("Не удалось отметить заметку: " + err)
        }
    }

    const handleFilterNote = async data => {
        try {
            console.log(data)
            let filtersQuery = "?"
            setUsedParams([]);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const value = data[key];
                    if (value != null) {
                        if (key.includes('completionDate') || key.includes('created')) {
                            filtersQuery += "filterInfo." + key + "=" + value.toISOString() + "&"
                        } else {
                            filtersQuery += "filterInfo." + key + "=" + value.value.toString() + "&"
                        }
                        console.log(key)
                        setUsedParams(prev => ([...prev, key]))
                    }
                }
            }

            if (filtersQuery.endsWith("&")) {
                filtersQuery = filtersQuery.slice(0, -1);
            }
            console.log(filtersQuery)
            setQueryParams(filtersQuery)
        } catch (err) {
            toast.error("Ошибка применения фильтрации: " + err.message)
            console.error("Ошибка применения фильтрации: " + err)
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
        } else if (modalName === 'filterNote') {
            setSubmitHandler(() => handleFilterNote)
        }
    }

    useEffect(() => {
        noteService.listFilter(params.id, queryParams)
            .then(res => {
                setNotes(res.notes)
            })
            .catch(error => console.error(error));
    }, [updateItems, queryParams])

    return (
        <Container className='notes__container'>
            <div className='notes__header'>
                <div className='notes__title'>Заметки</div>
                <button onClick={() => {
                    openModal('filterNote')
                }}
                        className='icon-button'><SlidersHorizontal/></button>
            </div>
            <div className={`notes__filters ${usedParams.length > 0 ? 'notes__filters-visible' : ''}`}>
                <span className='notes__filters-title'>Активные фильтры</span>
                <div className='notes__filters-list'>
                    {usedParams.map((item, key) => (
                        <div className='notes__filter' key={key}>{item}</div>
                    ))}
                </div>
            </div>
            <div className='notes__list'>
            {notes.map((note) => (
                    <Note note={note} openModal={openModal} key={note.id} />
                ))}
            </div>
            <button onClick={() => openModal('addNote')} className='note__button primary-button'>Добавить</button>
        </Container>
    )
}