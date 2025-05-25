import "./Profile.scss"
import {UserService} from "@/features/users/service/userService.js";
import {useEffect, useState} from "react";

export function ProfileLayout() {
    const userService = new UserService()
    const [user, setUser] = useState({});
    useEffect(() => {
        userService.get()
    }, [])

    return (
        <div className='profile__layout opacity_animation'>
            <div className='profile__container'>
                <div className='profile__text-block'>
                    <span className='profile__text-title'>Ваша почта: </span>
                    <span className='profile__text'>email@email.com</span>
                </div>
                <div className='profile__text-block'>
                    <span className='profile__text-title'>Ваше имя: </span>
                    <span className='profile__text'>Test Username</span>
                </div>
                <div className='profile__text-block'>
                    <span className='profile__text-title'>Дата регистрации: </span>
                    <span className='profile__text'>25/05/2025</span>
                </div>
            </div>
        </div>
    )
}