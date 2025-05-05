import {BoardList} from "@/features/boards/components/BoardList.jsx";
import './Board.scss'

export function BoardLayout() {

    return (
        <div className="board__layout opacity_animation">
            <BoardList />
        </div>
    )
}