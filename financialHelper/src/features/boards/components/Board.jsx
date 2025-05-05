import './Board.scss'

export function Board({data}) {
    return (
        <article
            className="board"
            role="button">

            <h2 className="board__name">{data.name}</h2>
            <p className="board__description">{data.description}</p>
        </article>
    )
}