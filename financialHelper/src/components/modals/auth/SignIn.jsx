import {Modal} from '../Modal.jsx'
import '../Modal.scss'
// import '../buttons/buttons.scss'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useModal} from "@/components/shared/hooks/useModal.js";
import {toast} from "react-toastify";
import axiosInstance from "@/api/httpClient/axiosInstance.js";
import {login} from "@/api/authApi.js";
import {toCreateUser, toLogin} from "@/api/models/user.js";

export function SignIn({open = false}) {
    const navigate = useNavigate();
    const  {setIsActive} = useModal();

    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const submitHandler = async data => {
        console.log(login(toLogin("test@mail.com", "testpassword")))
        // console.log(data)
        // await axios.post('http://localhost:8080/api/signin', data, {withCredentials: true})
        //     .then(response => {
        //         // console.log(response)
        //         if (response.status === 200) {
        //             // console.log("Successfully logged in")
        //             toast.success("Вы успешно вошли")
        //             navigate("/profile", {replace: true})
        //             // localStorage.setItem("username", response.data.user.username)
        //             setIsActive(false)
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.response)
        //         toast.error("Неправильный логин или пароль")
        //     })
        reset()
    }

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <input  {...register('email')} className='modal__input' placeholder='Email' type='text' maxLength={45} />
                <input {...register('password')} className='modal__input' placeholder='пароль' type='password' />
                <button className='modal-button' type='submit'>Авторизоваться</button>
            </form>
        </Modal>
    )
}