import {CircleX, Pen} from "lucide-react";
import {useEffect, useState} from "react";
import {UserService} from "@/features/users/service/userService.js";

export function BoardUserCard({user, admin, openModal}) {
    const [userInfo, setUserInfo] = useState({})
    const userService = new UserService();
    const localUserId = localStorage.getItem("userID")
    useEffect(() => {
        userService.get(user.userId)
            .then(res => {
                // console.log("In card", res)
                setUserInfo(res.user)
            })
    }, [user])


    return (
        <div className='boardusers__card'>
            <div className='boardusers__user'>Пользователь: {userInfo?.info?.name}</div>
            <div className='boardusers__buttons'>
                {user.userId === localUserId || admin !== localUserId ?
                    ''
                    :
                    <button onClick={() => openModal('confirm', {name: userInfo?.info?.name, id: user.userId})}
                            className="icon-button icon-button__cross boardusers__icon-button"><CircleX/></button>
                }
            </div>
        </div>
    )
}