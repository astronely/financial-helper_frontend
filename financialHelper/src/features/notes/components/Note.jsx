import {CheckCircle, Circle, CircleX, Pen} from "lucide-react";
import {UserService} from "@/features/users/service/userService.js";
import {useEffect, useState} from "react";

export function Note({note, openModal}) {

    const [performer, setPerformer] = useState('');
    const userService = new UserService();

    useEffect(() => {
        if (note.info.performerId > 0) {
            userService.get(note.info.performerId)
                .then(res => {
                    console.log(res)
                    setPerformer(res.user.info.name)
                })
                .catch(err => console.error(err))
        }
    }, [])

    return (
        <div className={`note ${note.info.status ? 'note__complete' : ''}`}>
            <div className='note__header'>
                <button onClick={() => openModal('updateNote', note, note.id)}
                        className="icon-button icon-button__pen"><Pen/></button>
                <button onClick={() => openModal('confirm', note, note.id)}
                        className="icon-button icon-button__cross"><CircleX/></button>

            </div>
            <div className='note__content'>{note.info.content}</div>
            <div className='note__complete-info'>
                {note.info.status ?
                    <button onClick={() => openModal('complete', {id: note.id, status: !note.info.status})} className='note__checkbox note__checkbox-button'><CheckCircle/></button>
                    :
                    <button onClick={() => openModal('complete', {id: note.id, status: !note.info.status})} className='note__checkbox note__checkbox-button'><Circle/></button>
                }
                {note.info.status ? <span className='note__checkbox'>{performer}</span> : ''}
            </div>
        </div>
    )
}