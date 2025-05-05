import {Wallet} from "@/features/wallets/components/Wallet.jsx";
import {openConfirm} from "@/shared/utils/modalUtils.js";
import {useEffect, useState} from "react";
import {BoardService} from "@/features/boards/service/boardService.js";
import {Board} from "@/features/boards/components/Board.jsx";
import './Board.scss'

export function BoardList() {
    const [boards, setBoards] = useState([]);
    const boardService = new BoardService()
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        boardService.listByUserId({userID})
            .then(data => {
                setBoards(Array.isArray(data.boards) ? data.boards : []);
            })
            .catch(err => {
                console.error("Не удалось получить доски:", err)
                setBoards([]);
            })
    }, [])

    return (
        <div className="boards">
            <h1 className={'board__title'}>Доски</h1>
            <div className={'board__list'}>
                {boards.map((data, index) => (
                    <Board data={data.info} key={index}/>
                ))}
            </div>
        </div>
    )
}