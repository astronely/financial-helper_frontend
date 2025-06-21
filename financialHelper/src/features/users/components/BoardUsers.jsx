import "./BoardUsers.scss"
import {BoardUserCard} from "@/features/users/components/BoardUserCard.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {useEffect, useState} from "react";
import {BoardService} from "@/features/boards/service/boardService.js";
import {useParams} from "react-router";
import {toast} from "react-toastify";

export function BoardUsers() {
    const {updateItems, setUpdateItems, setIsActive, setModal, baseInfo, setBaseInfo, setSubmitHandler} = useModal()
    const boardService = new BoardService();
    const params = useParams()

    const [boardUsers, setBoardUsers] = useState([]);
    const [boardAdmin, setBoardAdmin] = useState({})

    const handleDeleteUser = async ({data, id}) => {
        try {
            // console.log(data, id)
            const response = await boardService.deleteUser(id)
            setIsActive(false)
            setUpdateItems(!updateItems)
            toast.success("Пользователь успешно удален с доски")
        } catch (err) {
            console.error("Не удалось удалить пользователя из доски: " + err)
        }
    }

    function openModal(modalName, data) {
        setIsActive(true);
        setModal(modalName);
        setBaseInfo({name: data.name})
        if (modalName === 'confirm') {
            setSubmitHandler(() => (dataNew) => handleDeleteUser({...dataNew, id: data.id}));
        }
    }

    useEffect(() => {
        boardService.get({boardID: params.id})
            .then(res => {
                console.log("Board")
                console.log(res.board.info.ownerId)
                setBoardAdmin(res.board.info.ownerId)
            })
            .catch(err => console.error(err))

        boardService.getBoardUsers(params.id)
            .then(res => {
                console.log(res)
                setBoardUsers(res.users)
            })
            .catch(err => console.error(err))
    }, [updateItems])

    return (
        <div className='boardusers__list'>
            {boardUsers.map((item) => (
                <BoardUserCard user={item} admin={boardAdmin} openModal={openModal} key={item.userId}/>
            ))}
        </div>
    )
}