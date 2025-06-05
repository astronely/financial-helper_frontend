import {Modal} from '../Modal.jsx'
import {useForm} from "react-hook-form";
import '../Modal.scss'
import {useModal} from "@/shared/hooks/useModal.js";

export function SignUp({open = false}) {
    const  { submitHandler} = useModal();

    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            email: '',
            name: '',
            full_name: '',
            password: ''
        }
    })

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <input  {...register('email')} className='modal__input' placeholder='Email' type='text' maxLength={45}/>
                <input {...register('name')} className='modal__input' placeholder='Имя пользователя' type='text' maxLength={30}/>
                <input {...register('password')} className='modal__input' placeholder='Пароль' type='password' maxLength={45}/>
                <button className='modal-button' type='submit'>Зарегистрироваться</button>
            </form>
        </Modal>
    )
}