import {Wallet} from "@/features/wallets/components/Wallet.jsx";
import {openConfirm} from "@/shared/utils/modalUtils.js";
import {useEffect, useState} from "react";
import {BoardService} from "@/features/boards/service/boardService.js";
import {Board} from "@/features/boards/components/Board.jsx";
import './Board.scss'
import {useNavigate} from "react-router-dom";

export function BoardList() {
    const navigate = useNavigate()
    const [boards, setBoards] = useState([]);
    const boardService = new BoardService()

    const setBoard = async id => {
        try {
            const response = await boardService.set(id);
            if (!response.result) {
                console.error("Ошибка подключения к доске с id=", id);
                return
            }
            navigate("/board/"+id)
        } catch (err) {
            console.error("Ошибка подключения к доске:" + err)
        }
    }

    useEffect(() => {
        boardService.listByUserId()
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
                    <Board id={data.id} data={data.info} clickFunc={setBoard} key={index}/>
                ))}
            </div>
        </div>
    )
}