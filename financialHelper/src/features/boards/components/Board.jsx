import './Board.scss'

export function Board({id, data, clickFunc}) {
    // console.log(id, data)
    return (
        <article
            className="board"
            role="button"
            onClick={() => clickFunc(id)}>

            <h2 className="board__name">{data.name}</h2>
            <p className="board__description">{data.description}</p>
        </article>
    )
}