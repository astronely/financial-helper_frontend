import {Modal} from '../Modal.jsx'
import {useForm} from "react-hook-form";
import '../Modal.scss'
import {useModal} from "@/shared/hooks/useModal.js";
import {useEffect} from "react";

export function SignUp({open = false}) {
    const  { submitHandler, registerReset} = useModal();

    const {register, handleSubmit,
        formState: {errors}, reset} = useForm({
        defaultValues: {
            email: '',
            name: '',
            full_name: '',
            password: ''
        }
    })

    useEffect(() => {
        // console.log("register signUp")
        registerReset('signUp', reset)
    }, [reset]);

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <input  {...register('email', {
                        required: true,
                        validate: (value) => {
                            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                            return emailRegex.test(value) || "Введите корректный email адрес";
                        },
                        minLength: {
                            value: 1,
                            message: "Минимум 1 символ"
                        }
                    })} className='modal__input' placeholder='Email' type='text' maxLength={45}/>
                    {errors.email && (
                        <div className='modal__error-message'>{errors.email.message}</div>
                    )}
                </div>
                <div>
                    <input {...register('name', {
                        required: true,
                        minLength: {
                            value: 1,
                            message: "Минимум 1 символ"
                        }
                    })} className='modal__input' placeholder='Имя пользователя' type='text' maxLength={30}/>
                    {errors.name && (
                        <div className='modal__error-message'>{errors.name.message}</div>
                    )}
                </div>
                <div>
                    <input {...register('password', {
                        required: true,
                        minLength: {
                            value: 8,
                            message: "Минимум 8 символов"
                        }
                    })} className='modal__input' placeholder='Пароль' type='password' maxLength={45}/>
                    {errors.password && (
                        <div className='modal__error-message'>{errors.password.message}</div>
                    )}
                </div>
                <button className='modal-button' type='submit'>Зарегистрироваться</button>
            </form>
        </Modal>
    )
}