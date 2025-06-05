import {Modal} from '../Modal.jsx'
import '../Modal.scss'
import {useForm} from "react-hook-form";
import {useModal} from "@/shared/hooks/useModal.js";

export function SignIn({open = false}) {
    const  { submitHandler} = useModal();

    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

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