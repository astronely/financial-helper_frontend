import {Modal} from '../Modal.jsx'
import {useForm} from "react-hook-form";
import '../Modal.scss'
// import '../buttons/buttons.scss'
import {useNavigate} from "react-router-dom";
import {useModal} from "@/shared/hooks/useModal.js";
import axios from "axios";
import {toast} from "react-toastify";
import axiosInstance from "@/api/httpClient/axiosInstance.js";

export function SignUp({open = false}) {
    const navigate = useNavigate();
    const  {setIsActive, submitHandler} = useModal();

    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            email: '',
            name: '',
            full_name: '',
            password: ''
        }
    })

    function isSignUpDataCorrect(data) {
        return !(data.email === '' || data.username === '' || data.full_name === '' || data.password === '');
    }

    // const submitHandler = async data => {
    //     axiosInstance.get("/api/v1/user/list").then((res) => {
    //         console.log(res)
    //     })
        // console.log(data)
        // if (!isSignUpDataCorrect(data)) {
        //     toast.error("Заполните все поля")
        //     return
        // }
        // await axios.post('http://localhost:8080/api/signup', data, {withCredentials: true})
        //     .then(response => {
        //         console.log(response)
        //         if (response.status === 200) {
        //             // console.log("Successfully registered")
        //             toast.success("Вы успешно зарегистрировались")
        //             navigate("/profile", {replace: true})
        //             setIsActive(false)
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         if (error.response.status === 403) {
        //             toast.error("Пользователь с такой почтой уже зарегистрирован")
        //         }
        //         else toast.error("Неправильно заполнены поля")
        //     })
    //     reset()
    // }

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <input  {...register('email')} className='modal__input' placeholder='Email' type='text' maxLength={45}/>
                <input {...register('name')} className='modal__input' placeholder='Имя пользователя' type='text' maxLength={30}/>
                {/*<input {...register('full_name')} className='modal__input' placeholder='ФИО' type='text' maxLength={45}/>*/}
                <input {...register('password')} className='modal__input' placeholder='Пароль' type='password' maxLength={45}/>
                <button className='modal-button' type='submit'>Зарегистрироваться</button>
            </form>
        </Modal>
    )
}