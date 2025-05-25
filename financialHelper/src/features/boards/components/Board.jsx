import './Board.scss'
import {CircleX, Pen} from "lucide-react";

export function Board({id, data, clickFunc, openModal}) {
    // console.log(id, data)
    return (
        <div className='board__card'>
            <article
                className="board"
                role="button"
                onClick={() => clickFunc(id)}>
                <h2 className="board__name">{data.name}</h2>
                <p className="board__description">{data.description}</p>
            </article>

            <div className='board__buttons'>
                <button onClick={() => openModal('updateBoard', {id: id, name: data.name, description: data.description})}
                    className="primary-button">Изменить</button>
                <button onClick={() => openModal('confirm', {id: id})}
                    className="primary-button">Удалить</button>
            </div>
        </div>
    )
}