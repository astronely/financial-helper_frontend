import "./Profile.scss"
import {UserService} from "@/features/users/service/userService.js";
import {useEffect, useState} from "react";
import {useModal} from "@/shared/hooks/useModal.js";
import {toast} from "react-toastify";

export function ProfileLayout() {
    const userService = new UserService()
    const [user, setUser] = useState({});
    const {updateItems, setUpdateItems, setIsActive, setModal, setBaseInfo, setSubmitHandler} = useModal()

    useEffect(() => {
        userService.get(0)
            .then(res => {
                console.log(res.user)
                setUser(res.user)
            })
            .catch(err => console.error(err))
    }, [updateItems])

    const handleUpdateUser = async data => {
        try {
            const dataToSend = {
                id: data.id,
                info: {
                    name: data.name,
                }
            }
            const response = await userService.update(dataToSend)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            toast.error("Ошибка изменения данных пользователя: " + err.message)
            console.error(err)
        }
    }

    function openModal(modalName) {
        setIsActive(true)
        setModal(modalName)
        setBaseInfo({id: user.id, name: user.info.name})
        setSubmitHandler(() => handleUpdateUser)
    }

    return (
        <div className='profile__layout opacity_animation'>
            <div className='profile__container'>
                <div className='profile__text-block'>
                    <span className='profile__text-title'>Ваша почта: </span>
                    <span className='profile__text'>{user?.info?.email}</span>
                </div>
                <div className='profile__text-block'>
                    <span className='profile__text-title'>Ваше имя: </span>
                    <span className='profile__text'>{user?.info?.name}</span>
                </div>
                <div className='profile__text-block'>
                    <span className='profile__text-title'>Дата регистрации: </span>
                    <span className='profile__text'>{user?.createdAt?.split('T')[0]} {user?.createdAt?.split('T')[1].split('.')[0]}</span>
                </div>

                <button onClick={() => openModal("updateUser")} className='primary-button profile__button'>Изменить</button>
            </div>
        </div>
    )
}