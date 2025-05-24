import {Wallet} from "@/features/wallets/components/Wallet.jsx";
import {openConfirm} from "@/shared/utils/modalUtils.js";
import {useEffect, useState} from "react";
import {BoardService} from "@/features/boards/service/boardService.js";
import {Board} from "@/features/boards/components/Board.jsx";
import './Board.scss'
import {useNavigate} from "react-router-dom";
import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";
import {Container} from "react-bootstrap";

export function BoardList() {
    const navigate = useNavigate()
    const [boards, setBoards] = useState([]);
    const boardService = new BoardService()
    const {setIsActive, setModal, setSubmitHandler, setBaseInfo, updateItems, setUpdateItems} = useModal();
    const {reset} = useForm()

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

    const handleAddBoard = async data => {
        try {
            console.log(data)
            const dataToSend = {
                name: data.name.trim(),
                description: data.description.trim(),
            }
            const response = await boardService.create(dataToSend)
            console.log(response)
            setUpdateItems(!updateItems)
            setIsActive(false)
            reset()
        } catch (error) {
            console.error("Не удалось создать новую доску: " + error)
        }
    }

    function openModal(modalName) {
        setIsActive(true)
        setModal(modalName)

        if (modalName === "addBoard") {
            setSubmitHandler(() => handleAddBoard)
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
    }, [updateItems])

    return (
        <div className="boards">
            <h1 className='board__title'>Доски</h1>
            <Container className='board__list'>
                {boards.map((data, index) => (
                    <Board id={data.id} data={data.info} clickFunc={setBoard} key={index}/>
                ))}
                <article
                    className='board board__add'
                    role='button'
                    onClick={() => openModal('addBoard')}>+
                </article>
            </Container>
        </div>
    )
}