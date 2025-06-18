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
import {toast} from "react-toastify";

export function BoardList() {
    const navigate = useNavigate()
    const [boards, setBoards] = useState([]);
    const boardService = new BoardService()
    const {setIsActive, setModal, setSubmitHandler, setBaseInfo,
        updateItems, setUpdateItems, resetModal} = useModal();
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
            toast.error("Ошибка подключения к доске: " + err.message)
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

            resetModal('addBoard')
        } catch (error) {
            toast.error("Ошибка добавления доски: " + error.message)
            console.error("Не удалось создать новую доску: " + error)
        }
    }

    const handleUpdateBoard = async data => {
        try {
            // console.log(data)
            const dataToSend = {
                id: data.id,
                name: data.name.trim(),
                description: data.description.trim(),
            }
            console.log(dataToSend)
            const response = await boardService.update(dataToSend)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            if (err.status !== 401) {
                toast.error("Ошибка обновления доски: " + err.message)
            }
            console.error("Не удалось изменить доску: " + err)
        }
    }

    const handleDeleteBoard = async ({data, id}) => {
        try {
            console.log(id)
            const response = await boardService.delete(id)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            if (err.status !== 401) {
                toast.error("Ошибка удаления доски: " + err.message)
            }
            console.error("Не удалось удалить доску: " + err)
        }
    }

    function openModal(modalName, data) {
        setIsActive(true)
        setModal(modalName)

        if (modalName === "addBoard") {
            setSubmitHandler(() => handleAddBoard)
        } else if (modalName === "updateBoard") {
            setBaseInfo({id: data.id, name: data.name, description: data.description})
            setSubmitHandler(() => handleUpdateBoard)
        } else if (modalName === "confirm") {
            setBaseInfo({name: data.name})
            setSubmitHandler(() => (dataNew) =>
                handleDeleteBoard({...dataNew, id: data.id})
            )
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
                    <Board id={data.id} data={data.info} clickFunc={setBoard} openModal={openModal} key={data.id}/>
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